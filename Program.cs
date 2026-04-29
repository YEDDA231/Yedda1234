using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

// Serve images from the project's `PICTURE` folder (outside `wwwroot`).
// Reference it in Razor as: `~/PICTURE/job.jpg`.
var picturePhysicalPath = Path.Combine(builder.Environment.ContentRootPath, "PICTURE");
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(picturePhysicalPath),
    RequestPath = "/PICTURE"
});

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

app.Run();
