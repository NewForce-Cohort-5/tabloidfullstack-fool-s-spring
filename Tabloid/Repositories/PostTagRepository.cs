using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAllTagsOnASinglePost(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT pt.Id AS PostTagId, pt.PostId, pt.TagId, t.[Name] 
                          FROM PostTag pt
                     LEFT JOIN Tag t ON pt.TagId = t.Id
                         WHERE pt.PostId = @postId
                    ";

                    cmd.Parameters.AddWithValue("@postId", postId);

                    var reader = cmd.ExecuteReader();

                    var PostTags = new List<Tag>();

                    while (reader.Read())
                    {
                        PostTags.Add(new Tag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("TagId")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        });
                    }

                    reader.Close();

                    return PostTags;
                }
            }
        }

        public void Add(int postId, List<int> tagIds)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO PostTag (PostId, TagId)
                             VALUES ";

                    for (int i = 0; i < tagIds.Count; i++)
                    {
                        if (i == 0)
                        {
                            // If the list only contains one id or it's on the first id from the list
                            // just simply insert it like a normal insert statement
                            cmd.CommandText += $"(@postId, @tagId)";
                            cmd.Parameters.AddWithValue("@postId", postId);
                            cmd.Parameters.AddWithValue("@tagId", tagIds[i]);
                        }
                        else
                        {
                            // With multiple values we need to separate each value to add to db by comma
                            cmd.CommandText += $", (@postId{i}, @tagId{i})";
                            cmd.Parameters.AddWithValue($"@postId{i}", postId);
                            cmd.Parameters.AddWithValue($"@tagId{i}", tagIds[i]);
                        }
                    }

                    cmd.ExecuteNonQuery();
                    //cmd.Parameters.AddWithValue("@PostId", postId);
                    //cmd.Parameters.AddWithValue("@TagId", postTag.TagId);

                    //postTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
