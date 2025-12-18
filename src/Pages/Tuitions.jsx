import React, { use, useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import { Link } from "react-router";
import { Search, Filter, SortAsc, ChevronLeft, ChevronRight } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";

const Tuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [filteredTuitions, setFilteredTuitions] = useState([]);
  // const [loading, setLoading] = useState(true);
  const {loading,setLoading} = use(AuthContext)
  
  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState("");
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const axiosInstance = useAxios();

  useEffect(() => {
    setLoading(true);
    axiosInstance.get("/all-tuitions").then((data) => {
      setTuitions(data.data);
      setFilteredTuitions(data.data);
      setLoading(false);
    });
  }, []);

  // Get unique values for filters
  const classes = [...new Set(tuitions.map(t => t.class))].filter(Boolean);
  const subjects = [...new Set(tuitions.map(t => t.subject))].filter(Boolean);
  const locations = [...new Set(tuitions.map(t => t.location))].filter(Boolean);

  // Apply filters, search, and sort
  useEffect(() => {
    let result = [...tuitions];

    // Search by subject or location
    if (searchTerm) {
      result = result.filter(
        (tuition) =>
          tuition.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tuition.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by class
    if (selectedClass) {
      result = result.filter((tuition) => tuition.class === selectedClass);
    }

    // Filter by subject
    if (selectedSubject) {
      result = result.filter((tuition) => tuition.subject === selectedSubject);
    }

    // Filter by location
    if (selectedLocation) {
      result = result.filter((tuition) => tuition.location === selectedLocation);
    }

    // Sort by budget
    if (sortBy === "low-to-high") {
      result.sort((a, b) => a.budget - b.budget);
    } else if (sortBy === "high-to-low") {
      result.sort((a, b) => b.budget - a.budget);
    }

    setFilteredTuitions(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedClass, selectedSubject, selectedLocation, sortBy, tuitions]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTuitions = filteredTuitions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTuitions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedClass("");
    setSelectedSubject("");
    setSelectedLocation("");
    setSortBy("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading tuitions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="w-11/12 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tuition Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect tutoring opportunity that matches your expertise
            and schedule
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by subject or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Class Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Classes</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort by Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort by Budget
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Default</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Info & Clear Filters */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{currentTuitions.length}</span> of{" "}
              <span className="font-semibold">{filteredTuitions.length}</span> tuitions
            </p>
            {(searchTerm || selectedClass || selectedSubject || selectedLocation || sortBy) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Tuition Cards Grid */}
        {currentTuitions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No tuitions found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentTuitions.map((tuition) => (
                <div
                  key={tuition._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold">{tuition.subject}</h3>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                        {tuition.class}
                      </span>
                    </div>
                    <p className="text-purple-300 text-sm">📍 {tuition.location}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    {/* Budget */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Budget</span>
                      <span className="text-2xl font-bold text-green-600">
                        ৳{tuition.budget}
                      </span>
                    </div>

                    {/* Additional Info */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        Tutor: {tuition.tutorGender}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        Student: {tuition.studentGender}
                      </span>
                    </div>

                    {/* Action Button */}
                    <Link to={`tuition-details/${tuition._id}`}>
                      <button className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform group-hover:scale-105">
                        Apply Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        currentPage === pageNumber
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Pagination Info */}
            <div className="mt-4 text-center text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tuitions;