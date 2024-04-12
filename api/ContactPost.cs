using System.ComponentModel.DataAnnotations;

namespace TaiwoTech.Enterprise.Eltee.Api;

public class ContactPost
{
  [Required]
  [ValidEmail]
  public required string EmailAddress { get; set; }
  [Required]
  public required string Message { get; set; }
}
