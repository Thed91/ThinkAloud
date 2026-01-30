using Microsoft.AspNetCore.Mvc;
using ThinkAloud.Models;
using ThinkAloud.Services;

namespace ThinkAloud.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;

    public ChatController(IChatService chatService)
    {
        _chatService = chatService;
    }

    [HttpPost]
    public async Task<ActionResult<ChatResponse>> SendMessage([FromBody] ChatRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Message))
        {
            return BadRequest(new ChatResponse
            {
                Success = false,
                Error = "Message cannot be empty"
            });
        }

        var response = await _chatService.SendMessageAsync(request.Message);

        if (!response.Success)
        {
            return StatusCode(500, response);
        }

        return Ok(response);
    }
}
