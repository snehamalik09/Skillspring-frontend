import React from 'react';
import axios from 'axios';
import { useProfileQuery } from '../features/api/authApi';

const PaymentButton = ({courseId, course}) => {
    const {data:userDetails} = useProfileQuery();

    const handlePayment = async () => {
        try {
            // Create order via backend
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`, {
                amount: course.coursePrice, 
                courseId,
            },
        {
            withCredentials:true
        });

            console.log("payment response : ", response.data);

            const { id: order_id} = response.data;
            const courseID = response.data.notes.courseId;

            const options = {
                key: 'rzp_test_KwAZ36C196Qhf5', 
                amount: course?.coursePrice,
                currency: 'INR',
                name: "SkillSpring",
                description: "Test Transaction",
                order_id: order_id,
                callback_url:`${import.meta.env.VITE_BACKEND_URL}/api/payment/paymentVerification`,
                prefill: {
                    name: userDetails?.user?.name,
                    email: userDetails?.user?.email,
                },
                theme: {
                    color: "#3399cc",
                },
                notes:{
                    courseId : courseID
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Payment initiation failed:', error);
        }
    };

    return (
    <div>
      <button onClick={handlePayment} className='bg-[#192A88] w-[100%] text-white px-4 py-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95'>Buy Course</button>
    </div>
  )
};

export default PaymentButton;