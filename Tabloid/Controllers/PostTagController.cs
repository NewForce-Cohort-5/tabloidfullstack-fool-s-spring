using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly IPostTagRepository _postTagRepository;
        public PostTagController(IPostTagRepository postTagRepository)
        {
            _postTagRepository = postTagRepository;
        }

        //GET ALL PostTags
        [HttpGet]
        public IActionResult Get(int postId)
        {
            return Ok(_postTagRepository.GetAllTagsOnASinglePost(postId));
        }

        //ADD TAG TO POST - PostTags
        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            _postTagRepository.Add(postTag);
            return CreatedAtAction("Get", new { id = postTag.Id }, postTag);
        }
    }
}
