using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection.PortableExecutable;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration config) : base(config) { }
        public List<Post> GetAllPublishedPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = SelectPostFields()
                                    + CategoryFields()
                                    + UserProfileFields()
                                    + UserTypeFields()
                                    + FromPost()
                                    + JoinCategory()
                                    + JoinUserProfile()
                                    + JoinUserType()
                                    + WhereApprovedAndPublished()
                                    + OrderByPublishedDesc();
                              
                    //   SELECT p.Id, p.Title, p.Content, 
                    //          p.ImageLocation AS HeaderImage,
                    //          p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                    //          p.CategoryId, p.UserProfileId,
                    //          c.[Name] AS CategoryName,
                    //          u.FirstName, u.LastName, u.DisplayName, 
                    //          u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                    //          u.UserTypeId, 
                    //          ut.[Name] AS UserTypeName
                    //     FROM Post p
                    //          LEFT JOIN Category c ON p.CategoryId = c.id
                    //          LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                    //          LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                    //    WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                    //    ORDER BY p.PublishDateTime DESC

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public List<Post> GetAllPostsByUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = SelectPostFields()
                                    + CategoryFields()
                                    + UserProfileFields()
                                    + UserTypeFields()
                                    + FromPost()
                                    + JoinCategory()
                                    + JoinUserProfile()
                                    + JoinUserType()
                                    + WhereCreatedAndIdEquals()
                                    + OrderByPostCreatedDateTimeDesc();

                    cmd.Parameters.AddWithValue("@id", id);

                    //   SELECT p.Id, p.Title, p.Content, 
                    //          p.ImageLocation AS HeaderImage,
                    //          p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                    //          p.CategoryId, p.UserProfileId,
                    //          c.[Name] AS CategoryName,
                    //          u.FirstName, u.LastName, u.DisplayName, 
                    //          u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                    //          u.UserTypeId, 
                    //          ut.[Name] AS UserTypeName
                    //     FROM Post p
                    //          LEFT JOIN Category c ON p.CategoryId = c.id
                    //          LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                    //          LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                    //    WHERE p.CreateDateTime < SYSDATETIME() AND u.Id = @id
                    //    ORDER BY p.CreateDateTime DESC

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public List<Post> GetAllPublishedPostsByUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = SelectPostFields()
                                    + CategoryFields()
                                    + UserProfileFields()
                                    + UserTypeFields()
                                    + FromPost()
                                    + JoinCategory()
                                    + JoinUserProfile()
                                    + JoinUserType()
                                    + WhereApprovedAndPublishedAndIdEquals()
                                    + OrderByPublishedDesc();

                    cmd.Parameters.AddWithValue("@id", id);

                    //   SELECT p.Id, p.Title, p.Content, 
                    //          p.ImageLocation AS HeaderImage,
                    //          p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                    //          p.CategoryId, p.UserProfileId,
                    //          c.[Name] AS CategoryName,
                    //          u.FirstName, u.LastName, u.DisplayName, 
                    //          u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                    //          u.UserTypeId, 
                    //          ut.[Name] AS UserTypeName
                    //     FROM Post p
                    //          LEFT JOIN Category c ON p.CategoryId = c.id
                    //          LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                    //          LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                    //    WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME() AND u.Id = @id
                    //    ORDER BY p.PublishDateTime DESC

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public Post GetPublishedPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = SelectPostFields()
                                    + CategoryFields()
                                    + UserProfileFields()
                                    + UserTypeFields()
                                    + FromPost()
                                    + JoinCategory()
                                    + JoinUserProfile()
                                    + JoinUserType()
                                    + WhereApprovedAndPublishedAndPostIdEquals();

                       //SELECT p.Id, p.Title, p.Content, 
                       //       p.ImageLocation AS HeaderImage,
                       //       p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                       //       p.CategoryId, p.UserProfileId,
                       //       c.[Name] AS CategoryName,
                       //       u.FirstName, u.LastName, u.DisplayName, 
                       //       u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                       //       u.UserTypeId, 
                       //       ut.[Name] AS UserTypeName
                       //  FROM Post p
                       //       LEFT JOIN Category c ON p.CategoryId = c.id
                       //       LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                       //       LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                       // WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                       //       AND p.id = @id

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Post post = null;

                    if (reader.Read())
                    {
                        post = NewPostFromReader(reader);
                    }

                    reader.Close();

                    return post;
                }
            }
        }

        public Post GetUserPostById(int id, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE p.id = @id AND p.UserProfileId = @userProfileId";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    Post post = null;

                    if (reader.Read())
                    {
                        post = NewPostFromReader(reader);
                    }

                    reader.Close();

                    return post;
                }
            }
        }


        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (
                            Title, Content, ImageLocation, CreateDateTime, PublishDateTime,
                            IsApproved, CategoryId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Content, @ImageLocation, @CreateDateTime, @PublishDateTime,
                            @IsApproved, @CategoryId, @UserProfileId )";

                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@IsApproved", post.IsApproved);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        private Post NewPostFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                ImageLocation = DbUtils.GetString(reader, "HeaderImage"),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                Category = new Category()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                },
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    ImageLocation = DbUtils.GetString(reader, "AvatarImage"),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                }
            };
        }
        public void UpdatePost(Post post)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Post
                            SET 
                                Title = @title, 
                                Content = @content, 
                                ImageLocation = @imageLocation, 
                                CreateDateTime = @createDateTime, 
                                PublishDateTime = @publishDateTime,
                                IsApproved = @isApproved,
                                CategoryId = @categoryId,
                                UserProfileId = @userProfileId
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@title", post.Title);
                    cmd.Parameters.AddWithValue("@content", post.Content);
                    cmd.Parameters.AddWithValue("@imageLocation", post.ImageLocation);
                    cmd.Parameters.AddWithValue("@createDateTime", post.CreateDateTime);
                    cmd.Parameters.AddWithValue("@publishDateTime", post.PublishDateTime);
                    cmd.Parameters.AddWithValue("@isApproved", post.IsApproved);
                    cmd.Parameters.AddWithValue("@categoryId", post.CategoryId);
                    cmd.Parameters.AddWithValue("@userProfileId", post.UserProfileId);
                    cmd.Parameters.AddWithValue("@id", post.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeletePost(int postId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Post
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", postId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // TODO: Add comments

        //public List<Comment> GetPostComments(int postId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                    SELECT
        //                 p.Title, p.Content, p.Id AS PostId, p.ImageLocation AS PostImage,
        //                 p.CreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId,
        //                 c.Id as CommentId, c.PostId, c.UserProfileId, c.[Subject], c.Content, c.CreateDateTime AS CommentCreateDateTime,
        //                 u.Id AS UserId, u.DisplayName, u.FirstName, u.LastName, u.Email, u.CreateDateTime AS UserProfileCreateDateTime, u.ImageLocation AS AvatarImage, u.UserTypeId,
        //                 ut.Name AS UserTypeName
        //                 FROM Post p
        //                 LEFT JOIN Comment c on p.id = c.PostId
        //                 LEFT JOIN UserProfile u on p.UserProfileId = u.Id
        //                 LEFT JOIN UserType ut on u.UserTypeId = ut.Id
        //                ";

        //            var reader = cmd.ExecuteReader();

        //            var comments = new List<Comment>();

        //            while (reader.Read())
        //            {
        //                Comment comment = new Comment()
        //                {
        //                    Id = reader.GetInt32(reader.GetOrdinal("CommentId")),
        //                    PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
        //                    UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
        //                    Subject = DbUtils.GetNullableString(reader, "Subject"),
        //                    Content = DbUtils.GetNullableString(reader, "Content"),
        //                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
        //                    UserProfile = new UserProfile()
        //                    {
        //                        Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
        //                        FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
        //                        LastName = reader.GetString(reader.GetOrdinal("LastName")),
        //                        DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
        //                        Email = reader.GetString(reader.GetOrdinal("Email")),
        //                        CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
        //                        ImageLocation = DbUtils.GetNullableString(reader, "AvatarImage"),
        //                        UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
        //                        UserType = new UserType()
        //                        {
        //                            Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
        //                            Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
        //                        }
        //                    }
        //                };
        //            }
        //            reader.Close();

        //            return comments;
        //        }
        //    }
        //}

        //private Comment NewCommentFromReader(SqlDataReader reader)
        //{
        //    return new Comment()
        //    {
        //        Id = reader.GetInt32(reader.GetOrdinal("Id")),
        //        PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
        //        UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
        //        Subject = DbUtils.GetNullableString(reader, "Subject"),
        //        Content = DbUtils.GetNullableString(reader, "Content"),
        //        CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
        //        UserProfile = new UserProfile()
        //        {
        //            Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
        //            FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
        //            LastName = reader.GetString(reader.GetOrdinal("LastName")),
        //            DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
        //            Email = reader.GetString(reader.GetOrdinal("Email")),
        //            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
        //            ImageLocation = DbUtils.GetNullableString(reader, "AvatarImage"),
        //            UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
        //            UserType = new UserType()
        //            {
        //                Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
        //                Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
        //            }
        //        }
        //    };
        //}

        /// <summary>
        /// The beginning of a SELECT statement that gets necessary POST columns
        /// </summary>
        /// <returns>String</returns>
        private string SelectPostFields()
        {
            return $@"
                      SELECT  p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId
                    ";
        }

        /// <summary>
        /// Category columns needed in the SELECT statement
        /// </summary>
        /// <returns>String</returns>
        private string CategoryFields()
        {
            return @",
                        c.[Name] AS CategoryName
                    ";
        }

        /// <summary>
        /// User Profile columns needed in the SELECT statement
        /// </summary>
        /// <returns>String</returns>
        private string UserProfileFields()
        {
            return @",
                        u.FirstName, u.LastName, u.DisplayName, 
                        u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                        u.UserTypeId
                        
                    ";
        }
        
        /// <summary>
        /// User Type columns needed in the SELECT statement
        /// </summary>
        /// <returns>String</returns>
        private string UserTypeFields()
        {
            return @",
                        ut.[Name] AS UserTypeName 
                    ";
        }

        /// <summary>
        /// The FROM of the statement beginning with Posts
        /// </summary>
        /// <returns>String</returns>
        private string FromPost()
        {
            return @"
                        FROM Post p
                    ";
        }

        /// <summary>
        /// LEFT JOIN statement for Category on Posts
        /// </summary>
        /// <returns>String</returns>
        private string JoinCategory()
        {
            return @"
                        LEFT JOIN Category c ON p.CategoryId = c.id
                    ";
        }

        /// <summary>
        /// LEFT JOIN statement for UserProfile on Posts
        /// </summary>
        /// <returns>String</returns>
        private string JoinUserProfile()
        {
            return @"
                        LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                    ";
        }

        /// <summary>
        /// LEFT JOIN statement for UserType on Posts
        /// </summary>
        /// <returns>String</returns>
        private string JoinUserType()
        {
            return @"
                        LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                    ";
        }

        /// <summary>
        /// WHERE clause for getting approved posts published in the past
        /// </summary>
        /// <returns>String</returns>
        private string WhereApprovedAndPublished()
        {
            return @"
                        WHERE p.IsApproved = 1 AND p.PublishDateTime < SYSDATETIME()
                    ";
        }

        /// <summary>
        /// WHERE clause for getting approved posts published in the past belonging to a particular user
        /// </summary>
        /// <returns>String</returns>
        private string WhereApprovedAndPublishedAndIdEquals()
        {
            return @"
                        WHERE p.IsApproved = 1 AND p.PublishDateTime < SYSDATETIME() AND u.Id = @id
                    ";
        }

        /// <summary>
        /// WHERE clause for getting the details of a post published in the past belonging to a particular user
        /// </summary>
        /// <returns>String</returns>
        private string WhereApprovedAndPublishedAndPostIdEquals()
        {
            return @"
                        WHERE p.IsApproved = 1 AND p.PublishDateTime < SYSDATETIME() AND p.Id = @id
                    ";
        }

        /// <summary>
        /// WHERE clause for getting all posts published in the past belonging to a particular user
        /// </summary>
        /// <returns>String</returns>
        private string WherePublishedAndIdEquals()
        {
            return @"
                        WHERE p.PublishDateTime < SYSDATETIME() AND u.Id = @id
                    ";
        }

        /// <summary>
        /// WHERE clause for getting all posts created in the past belonging to a particular user
        /// </summary>
        /// <returns>String</returns>
        private string WhereCreatedAndIdEquals()
        {
            return @"
                        WHERE p.CreateDateTime < SYSDATETIME() AND u.Id = @id
                    ";
        }

        /// <summary>
        /// ORDER BY statement that will display the latest published Posts first
        /// </summary>
        /// <returns>String</returns>
        private string OrderByPublishedDesc()
        {
            return @"
                        ORDER BY p.PublishDateTime DESC 
                    ";
        }

        /// <summary>
        /// ORDER BY statement that will display the latest created Posts first
        /// </summary>
        /// <returns>String</returns>
        private string OrderByPostCreatedDateTimeDesc()
        {
            return @"
                        ORDER BY p.CreateDateTime DESC 
                    ";
        }

    }
}
