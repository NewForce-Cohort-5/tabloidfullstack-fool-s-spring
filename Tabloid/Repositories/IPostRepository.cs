using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void DeletePost(int postId);
        List<Post> GetAllPostsByUser(int id);
        List<Post> GetAllPublishedPosts();
        List<Post> GetAllPublishedPostsByUser(int id);
        Post GetPostById(int id);

        //List<Comment> GetPostComments(int postId);
        Post GetPublishedPostById(int id);
        Post GetUserPostById(int id, int userProfileId);
        void UpdatePost(Post post);
    }
}