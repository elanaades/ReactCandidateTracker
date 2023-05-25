using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactCandidateTracker.Data
{
    public class CandidateTrackerRepository
    {
        private readonly string _connectionString;

        public CandidateTrackerRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Candidate> GetCandidates()
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            return context.Candidates.ToList();
        }
        public void AddCandidate(Candidate candidate)
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            context.Candidates.Add(candidate);
            context.SaveChanges();
        }
        public Candidate GetById(int id)
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            return context.Candidates.FirstOrDefault(c => c.Id == id);
        }

        public void UpdateCandidate(Candidate candidate)
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            context.Candidates.Update(candidate);
            context.SaveChanges();

        }
    }
}
