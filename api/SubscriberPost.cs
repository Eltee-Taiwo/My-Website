using System.ComponentModel.DataAnnotations;

namespace TaiwoTech.Enterprise.Eltee.Api;

public class SubscriberPost
{
  [Required]
  [ValidEmail]
  public required string EmailAddress { get; set; }
}
