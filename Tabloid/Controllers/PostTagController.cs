using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
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

        //ADD TAGS TO POST - PostTags
        [HttpPost]
        public IActionResult Post(int postId, Dictionary<int, bool> tagIdMap)
        {
            var tagIds = new List<int>();
            // Extract the tag ids from the checkboxes that are in the form
            foreach (var id in tagIdMap)
            {
                // If a tag was selected then the first value from the form object will be true
                if (id.Value == true)
                {
                    // Use regex to get the tag id from the checkbox's key
                    tagIds.Add(id.Key);
                }
            }
            _postTagRepository.Add(postId, tagIds);

            return NoContent();
        }
    }
}
