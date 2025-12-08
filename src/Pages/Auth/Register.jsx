import { use, useState } from 'react';
import { Eye, EyeOff, UserCircle, GraduationCap, Mail, Lock, Phone, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router';

export default function Register() {
  const {register,handleSubmit,formState:{errors}} = useForm();
  const [formData, setFormData] = useState({
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
 
   const {createUser} = use(AuthContext);
 
  const handleRegistration = (data) => {
    const role = formData.role;
    data.role = role;
  //  console.log(data);
    createUser(data.email,data.password).then(result=>{
      console.log(result.user);
      navigate('/')
    })

   
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-indigo-100">Join our learning community today</p>
          </div>

          <form 
          onSubmit={handleSubmit(handleRegistration)}
          className="p-8 space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    formData.role === 'student'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-indigo-300 text-gray-600'
                  }`}
                >
                  <GraduationCap className="w-8 h-8 mb-2" />
                  <span className="font-semibold">Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'tutor' }))}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    formData.role === 'tutor'
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 text-gray-600'
                  }`}
                >
                  <UserCircle className="w-8 h-8 mb-2" />
                  <span className="font-semibold">Tutor</span>
                </button>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="label text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  {...register('name',{required:true})}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition `}
                  placeholder="Enter your full name"
                />
               
              </div>
               {errors.name?.type==='required'&&<p className='text-red-500'>
            Your Name is required
            </p>}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="label text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                {...register('email',{required:true})}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                  placeholder="your.email@example.com"
                />
               
              </div>
                {errors.email?.type==='required'&&<p className='text-red-500'>
            Email is required
            </p>}
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="label text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                {...register('phone',
                  {
                    required:true,
                    minLength: 11,
              
                  
                  })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition `}
                  placeholder="+880 1234-567890"
                />
              </div>
              {errors.phone?.type==="required"&& <p className="mt-1 text-sm text-red-600">Phone Number is required</p>}
             {
            errors.password?.type==="minLength"&& <p className='text-red-500'>Please Enter 11 digit phone number</p>
          }
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="label text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                   {...register('password',{
            required: true,
            minLength: 6,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
          })}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition `}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
                 {
            errors.password?.type==="required"&& <p className='text-red-500'>Password is required</p>
          }
            {
            errors.password?.type==="minLength"&& <p className='text-red-500'>Password must be at least 6 characters or longer</p>
          }
          {
            errors.password?.type==='pattern'&& <p className='text-red-500'>Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character needed</p>
          }
            </div>

            {/* Submit Button */}
            <button
             
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline">
                  Click here to login
                </a>
              </p>
            </div>
          </form>
        </div>

       
      </div>
    </div>
  );
}