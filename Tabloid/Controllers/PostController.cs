using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_postRepository.GetAllPublishedPosts());
        }

        [HttpGet("myposts")]
        public IActionResult GetAllMyPosts(int id)
        {
            return Ok(_postRepository.GetAllPostsByUser(id));
        }

        [HttpGet("{id}")]
        public IActionResult GetSinglePost(int id)
        {
            var post = _postRepository.GetPublishedPostById(id);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        [HttpGet("mine/{id}")]
        public IActionResult GetMyPost(int id)
        {
            var post = _postRepository.GetPostById(id);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            post.IsApproved = true;
            _postRepository.Add(post);
            return CreatedAtAction("GetMyPost", new { id = post.Id }, post);
        }
    }
}
