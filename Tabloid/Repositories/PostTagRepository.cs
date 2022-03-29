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

        public void Add(PostTag postTag)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO PostTag (PostId, TagId)
                             VALUES (@PostId, @TagId)";
                    cmd.Parameters.AddWithValue("@PostId", postTag.PostId);
                    cmd.Parameters.AddWithValue("@TagId", postTag.TagId);

                    postTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
