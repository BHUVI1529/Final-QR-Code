import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [editCandidate, setEditCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetching the data from the backend
    axios
     //.get('https://final-attendance.onrender.com/admin/users') // Update with the correct URL if necessary
      .get(`http://localhost:8080/admin/users`) // Update with the correct URL if necessary

      .then(response => {
        console.log('API response:', response.data); // Debugging API response
        setCandidates(response.data);
        setFilteredCandidates(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchEmail(value);
    if (value) {
      // Filtering candidates based on email
      const filtered = candidates.filter(candidate =>
        candidate.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCandidates(filtered);
    } else {
      setFilteredCandidates(candidates);
    }
  };

  const handleEdit = (candidate) => {
    setEditCandidate({ ...candidate });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios
      //.delete(`https://final-attendance.onrender.com/admin/user/${id}`)
      .delete(`http://localhost:8080/admin/user/${id}`)
      .then(() => {
        alert('User deleted successfully');
        setCandidates(candidates.filter(candidate => candidate.id !== id));
        setFilteredCandidates(filteredCandidates.filter(candidate => candidate.id !== id));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleSave = () => {
    axios
      //.put(`https://final-attendance.onrender.com/admin/user/${editCandidate.id}`, editCandidate)
      .put(`http://localhost:8080/admin/user/${editCandidate.id}`, editCandidate)
      .then(() => {
        alert('User updated successfully');
        const updatedCandidates = candidates.map(candidate =>
          candidate.id === editCandidate.id ? editCandidate : candidate
        );
        setCandidates(updatedCandidates);
        setFilteredCandidates(updatedCandidates);
        setEditCandidate(null);
        setShowModal(false);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div className=" bg-gray-100 min-h-screen font-sans">
      <Header />
      <h2 className="text-center text-gray-800 text-2xl font-semibold mb-6">Candidates Report</h2>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={handleSearch}
          className="p-3 w-full max-w-md text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Candidate</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editCandidate.name}
                  onChange={(e) => setEditCandidate({ ...editCandidate, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editCandidate.email}
                  onChange={(e) => setEditCandidate({ ...editCandidate, email: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  value={editCandidate.role}
                  onChange={(e) => setEditCandidate({ ...editCandidate, role: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <input
                  type="text"
                  value={editCandidate.course}
                  onChange={(e) => setEditCandidate({ ...editCandidate, course: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={editCandidate.phoneNumber}
                  onChange={(e) => setEditCandidate({ ...editCandidate, phoneNumber: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="p-3">SNO</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Course</th>
              <th className="p-3">Phone Number</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate,index) => (
                <tr key={candidate.id} className="odd:bg-gray-100 even:bg-gray-50">
                  <td className="p-3 border-t">{index + 1}</td> {/* Serial number */}
                  <td className="p-3 border-t">{candidate.name}</td>
                  <td className="p-3 border-t">{candidate.email}</td>
                  <td className="p-3 border-t">{candidate.course}</td>
                  <td className="p-3 border-t">{candidate.phoneNumber}</td>
                  <td className="p-3 border-t">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(candidate)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(candidate.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6">No candidates found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
       {/* Footer */}
       <footer className="bg-gray-700 text-white text-center py-4">
          <p className="text-sm">
              &copy; {new Date().getFullYear()} AppteKnow Careers. All rights reserved.
          </p>
          <p className="text-sm">
              Designed and developed by GRID R&D
          </p>
      </footer>
    </div>
  );

};

export default Candidates;



