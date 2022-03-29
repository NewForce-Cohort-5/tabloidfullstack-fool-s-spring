﻿using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        void Add(PostTag postTag);
        List<Tag> GetAllTagsOnASinglePost(int postId);
    }
}