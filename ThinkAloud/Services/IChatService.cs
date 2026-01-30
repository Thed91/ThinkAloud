using ThinkAloud.Models;

namespace ThinkAloud.Services;

public interface IChatService
{
    Task<ChatResponse> SendMessageAsync(string message);
}
