using System.Text;
using System.Text.Json;
using ThinkAloud.Models;

namespace ThinkAloud.Services;

public class GeminiChatService : IChatService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _model;

    public GeminiChatService(IConfiguration configuration)
    {
        _httpClient = new HttpClient();
        _apiKey = configuration["Gemini:ApiKey"] ?? throw new ArgumentNullException("Gemini:ApiKey is not configured");
        _model = configuration["Gemini:Model"] ?? "gemini-2.5-flash";

        _httpClient.BaseAddress = new Uri("https://generativelanguage.googleapis.com/");
    }

    public async Task<ChatResponse> SendMessageAsync(string message)
    {
        try
        {
            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = message }
                        }
                    }
                }
            };

            var json = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var url = $"v1/models/{_model}:generateContent?key={_apiKey}";
            var response = await _httpClient.PostAsync(url, content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return new ChatResponse
                {
                    Success = false,
                    Error = $"API Error: {response.StatusCode}"
                };
            }

            var jsonDoc = JsonDocument.Parse(responseContent);
            var assistantMessage = jsonDoc.RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();

            return new ChatResponse
            {
                Success = true,
                Response = assistantMessage ?? string.Empty
            };
        }
        catch (Exception ex)
        {
            return new ChatResponse
            {
                Success = false,
                Error = ex.Message
            };
        }
    }
}
