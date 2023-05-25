using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactCandidateTracker.Data;

namespace ReactCandidateTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateTrackerController : ControllerBase
    {
        private string _connectionString;

        public CandidateTrackerController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getcandidates")]
        public List<Candidate> GetOrders()
        {
            var repo = new CandidateTrackerRepository(_connectionString);
            return repo.GetCandidates();
        }

        [HttpPost]
        [Route("addcandidate")]
        public void AddCandidate(Candidate candidate)
        {
            var repo = new CandidateTrackerRepository(_connectionString);
            repo.AddCandidate(candidate);
        }

        [HttpGet]
        [Route("getcandidatebyid")]
        public Candidate GetOrderById(int id)
        {
            var repo = new CandidateTrackerRepository(_connectionString);
            return repo.GetById(id);
        }

        [HttpPost]
        [Route("updatecandidate")]
        public void UpdateCandidate(Candidate candidate)
        {
            var repo = new CandidateTrackerRepository(_connectionString);
            repo.UpdateCandidate(candidate);
        }
    }
}

