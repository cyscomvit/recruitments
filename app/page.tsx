'use client';
import bg from './assets/bg.jpg';
import logo from './assets/logo.json';
import Lottie from 'lottie-react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';
export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <div className=''>
        <Lottie animationData={logo} className="md:block inset-0 h-[15rem] w-full md:w-auto" />
      </div>
      <div className='text-4xl text-gray-300 text-center'>CYSCOM</div>
      <div className='text-2xl text-gray-300 text-center px-16 pt-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sit minima vel, eius ipsum commodi labore consequatur distinctio, repellat, impedit dolores. Laboriosam obcaecati optio ex ea eligendi quas et veritatis possimus culpa. Ab itaque exercitationem enim a nulla officiis nesciunt, fugit mollitia, quidem neque quisquam eligendi ducimus maxime? Sint, illum?</div>
      <div className='flex justify-center'>
      <Link  href='/' >
						<div className="bg-gray-300 cursor-pointer mt-10 h-10 w-52 rounded-xl group flex justify-center items-center gap-1 font-semibold">
							  Checkout Projects{' '}
							<span className='group-hover:rotate-90 duration-200'>
								<FaGithub />
							</span>
							
						</div>
						</Link>
      </div>
    </div>
  );
}