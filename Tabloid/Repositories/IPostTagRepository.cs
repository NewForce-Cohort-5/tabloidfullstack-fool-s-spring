using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        void Add(int postId, List<int> tagIds);
        List<Tag> GetAllTagsOnASinglePost(int postId);
    }
}