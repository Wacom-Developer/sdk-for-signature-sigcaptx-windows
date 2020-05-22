using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ASP_Sample.Startup))]
namespace ASP_Sample
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
