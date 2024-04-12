using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using OpenTelemetry.Trace;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace TaiwoTech.Enterprise.Eltee.Api;

public class ContactFunctions(ILogger<ContactFunctions> logger, Tracer tracer)
{
  internal static EmailAddress DefaultSender = new("DoNotReply@Eltee27.com", "Eltee - Do Not Reply");
  internal static EmailAddress EmailRecipient = new("eltee.taiwo@gmail.com", "Eltee Taiwo");
  private const string EmailSubject = "Eltee27.com - Contact Form";
  private const string MessageBody = "Hey Eltee, \n\n You've received a new email from your personal site. See the details below. \n Email: {0}  \n Message: {1}";

  [Function(nameof(Contact))]
  public async Task<HttpResponseData> Contact(
    [HttpTrigger(AuthorizationLevel.Anonymous,  "post", Route = nameof(Contact))] HttpRequestData req, [FromBody] ContactPost post)
  {
    using var span = tracer.StartRootSpan(nameof(Contact), SpanKind.Server);

    span.SetAttribute(nameof(ContactPost.EmailAddress), post.EmailAddress);
    span.SetAttribute(nameof(ContactPost.Message), post.Message);
    logger.LogInformation("C# HTTP trigger function processed a request.");

    var apiKey = Environment.GetEnvironmentVariable("SendGridApiKey")!;
    var client = new SendGridClient(apiKey);
    var messageBody = string.Format(MessageBody, post.EmailAddress, post.Message);
    var msg = MailHelper.CreateSingleEmail(DefaultSender, EmailRecipient, EmailSubject, messageBody, messageBody);
    var mailResponse = await client.SendEmailAsync(msg);

    span.SetAttribute("error", !mailResponse.IsSuccessStatusCode);
    logger.Log(mailResponse.IsSuccessStatusCode ? LogLevel.Information : LogLevel.Error,
      "Attempted to send message to {emailAddress}. Status is {status}", post.EmailAddress, mailResponse.StatusCode.ToString());
                
    var response = req.CreateResponse(mailResponse.IsSuccessStatusCode ? HttpStatusCode.OK : HttpStatusCode.InternalServerError);
    await response.WriteAsJsonAsync("Subscribed!");

    return response;
  }
}
