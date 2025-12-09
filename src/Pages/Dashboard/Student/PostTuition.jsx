import { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BookOpen, MapPin, DollarSign, Calendar, User, Clock, FileText, Send, CheckCircle } from 'lucide-react';
import useAxios from '../../../Hooks/useAxios';
import { AuthContext } from '../../../Context/AuthContext';

export default function PostTuition() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const axiosInstance = useAxios();
  const {user} = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
    'Computer Science', 'Accounting', 'Economics', 'Statistics', 'History'
  ];

  const classes = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'Class 11', 'Class 12', 'University', 'Professional Course'
  ];

  const genderOptions = ['Male', 'Female', 'Any'];
  const daysOptions = ['1', '2', '3', '4', '5', '6', '7'];
  const durationOptions = ['30 minutes', '1 hour', '1.5 hours', '2 hours', '2.5 hours', '3 hours'];

  const onSubmit = async (data) => {
    setLoading(true);
    const tuitionData = {
      ...data,
      budget: parseFloat(data.budget),
      status: 'Pending',
      createdAt: new Date().toISOString(),
      studentEmail : user?.email
    };

    try {
      axiosInstance.post('/tuitions',tuitionData)
      .then(res=>{
        console.log(res);
        
        console.log('tuition posted:', tuitionData);
      })
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        reset();
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error posting tuition:', error);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tuition Posted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your tuition request has been submitted and is pending admin approval. You will be notified once it's approved.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            Post Another Tuition
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Post Your Tuition Request
          </h1>
          <p className="text-lg text-gray-600">
            Fill in the details below and connect with qualified tutors
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white">Tuition Details</h2>
            <p className="text-indigo-100">All fields are required</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="inline w-4 h-4 mr-1" />
                  Subject
                </label>
                <select
                  {...register('subject', { required: 'Subject is required' })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="inline w-4 h-4 mr-1" />
                  Class/Level
                </label>
                <select
                  {...register('class', { required: 'Class is required' })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                    errors.class ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                {errors.class && <p className="mt-1 text-sm text-red-600">{errors.class.message}</p>}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  {...register('location', { 
                    required: 'Location is required',
                    validate: value => value.trim() !== '' || 'Location cannot be empty'
                  })}
                  placeholder="e.g., Dhanmondi, Dhaka"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="inline w-4 h-4 mr-1" />
                  Budget (৳ per month)
                </label>
                <input
                  type="number"
                  {...register('budget', { 
                    required: 'Budget is required',
                    min: { value: 1, message: 'Budget must be greater than 0' },
                    validate: value => !isNaN(value) || 'Please enter a valid budget'
                  })}
                  placeholder="e.g., 5000"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                    errors.budget ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>}
              </div>

              {/* Tutor Gender Preference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Tutor Gender Preference
                </label>
                <select
                  {...register('tutorGender', { required: 'Tutor gender preference is required' })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                    errors.tutorGender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
                {errors.tutorGender && <p className="mt-1 text-sm text-red-600">{errors.tutorGender.message}</p>}
              </div>

              {/* Student Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Student Gender
                </label>
                <select
                  {...register('studentGender', { required: 'Student gender is required' })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                    errors.studentGender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
                {errors.studentGender && <p className="mt-1 text-sm text-red-600">{errors.studentGender.message}</p>}
              </div>

              {/* Days Per Week */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Days Per Week
                </label>
                <select
                  {...register('daysPerWeek', { required: 'Days per week is required' })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                    errors.daysPerWeek ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Days</option>
                  {daysOptions.map(day => (
                    <option key={day} value={day}>{day} {day === '1' ? 'day' : 'days'}</option>
                  ))}
                </select>
                {errors.daysPerWeek && <p className="mt-1 text-sm text-red-600">{errors.daysPerWeek.message}</p>}
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Duration Per Session
                </label>
                <select
                  {...register('duration', { required: 'Duration is required' })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                    errors.duration ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Duration</option>
                  {durationOptions.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
                {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>}
              </div>

              {/* Description - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="inline w-4 h-4 mr-1" />
                  Description / Additional Requirements
                </label>
                <textarea
                  {...register('description', { 
                    required: 'Description is required',
                    validate: value => value.trim() !== '' || 'Description cannot be empty'
                  })}
                  rows="4"
                  placeholder="Describe your requirements, learning goals, or any specific needs..."
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Post Tuition Request
                  </>
                )}
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Your tuition request will be reviewed by admin before going live
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}