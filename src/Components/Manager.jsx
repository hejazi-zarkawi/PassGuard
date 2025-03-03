import React, { useEffect } from 'react'
import { useState } from 'react';
import { RiApps2AddFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaCopy } from "react-icons/fa6";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import { FaSearch } from "react-icons/fa";

const Manager = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }
        , [])


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        if (!form.site || !form.username || !form.password) {
            toast.error("⚠️ All fields are required!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return; // Stop execution if fields are empty
        }
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        toast.success('Password Saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });

        setform({ site: "", username: "", password: "" });
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const deletePassword = (id) => {
        let con = confirm("Do you really want to delete?")
        if (con) {
            setPasswordArray(passwordArray.filter((item) => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)))
            toast.success('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    const editPassword = (id) => {
        setform(passwordArray.filter((item) => item.id === id)[0])
        setPasswordArray(passwordArray.filter((item) => item.id !== id))
    }

    const filteredPasswords = passwordArray.filter((item) =>
        item.site.toLowerCase().includes(searchQuery.toLowerCase())
    );

    


    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className='w-[80%] mx-auto justify-center  items-center  flex flex-col pt-12 gap-5 pb-20'>
                <div className='flex flex-col justify-center  items-center '>
                    <div>
                        <span className='font-bold text-xl text-green-900'>&lt;</span>
                        <span className='font-bold text-xl'>Pass</span>
                        <span className='font-bold text-xl text-green-900'>GUARD /&gt;</span>
                    </div>
                    <p>Your own Password Manager</p>
                </div>
                {/* <form onSubmit={handleSubmit} className='w-[80%] flex flex-col items-center  gap-6'> */}
                <input type="text" name='site' value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='pl-2 flex items-center  w-[80%] rounded-2xl border-2 border-green-600 focus:border-black focus:outline-none' />
                <div className='w-[80%] md:flex md:flex-row flex-col items-center gap-10 justify-between'>
                    <input type="text" name='username' value={form.username} onChange={handleChange} placeholder='Enter Username' className='pl-2 flex items-center  sm:w-[50%] mb-5 sm:mb-0 w-full rounded-2xl border-2 border-green-600 focus focus:border-black focus:outline-none' />
                    <div className='sm:w-[50%] w-full relative flex items-center '>
                        <input type={showPassword ? "text" : "password"} name='password' value={form.password} onChange={handleChange} placeholder='Enter Password' className='pl-2 flex items-center  w-full rounded-2xl border-2 border-green-600  focus:border-black focus:outline-none' />
                        <button className='absolute top-1.5 right-4 cursor-pointer' onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                    </div>
                </div>

                <div className='flex mt-5'>
                    <button onClick={handleSave} className='text-xl flex gap-2 items-center  cursor-pointer hover:bg-green-500 bg-green-400 rounded-2xl px-5 py-2'> <RiApps2AddFill className='animate-bounce text-xl' /> Save Password</button>
                </div>

                <div className='flex lg:w-[80%] md:w-full md:pr-16 lg:pr-0 justify-end'>
                    <div className='flex lg:w-[30%] md:w-[40%] items-center rounded-2xl border-2 border-green-600 focus pl-2 gap-2 group focus-within:border-black'>
                        <FaSearch />
                        <input type="text" placeholder='Search by Site Name' value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} className='pl-2 flex items-center focus:outline-none' />
                    </div>
                </div>

                {/* </form> */}

                {/* Password Table */}

                <div className='md:w-full w-[100vw] lg:w-[80%] pl-2 md:pl-0 flex flex-col gap-4 mt-3'>
                    <h2 className='font-bold text-xl'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    
                    {passwordArray.length > 0 && filteredPasswords.length === 0 && <div>No Match Found</div>}

                    
                    <div>
                    {filteredPasswords.length !== 0 && <table className="md:w-full w-full   table-auto overflow-hidden rounded-md">
                        <thead className='bg-green-500 text-sm md:text-base '>
                            <tr>
                                <th className='sm:p-2 p-1 border-b border-black'>Site Name</th>
                                <th className='sm:p-2 p-1 border-b border-r border-l border-black'>Username</th>
                                <th className='sm:p-2 p-1 border-b border-black'>Password</th>
                                <th className='sm:p-2 p-1 border-b border-l border-black'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100 text-sm md:text-base'>

                            {filteredPasswords.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td className='sm:p-2 text-center border-b border-l border-black'><div className='flex justify-center items-center gap-3'><a target="_blank" href={item.site}>{item.site}</a> <FaCopy className='cursor-pointer' onClick={() => { copyText(item.site) }} /> </div></td>
                                        <td className='sm:p-2 text-center border-b border-r border-l border-black'><div className='flex justify-center items-center gap-3'>{item.username}<FaCopy className='cursor-pointer' onClick={() => { copyText(item.username) }} /></div></td>
                                        <td className='sm:p-2 text-center border-b border-r border-black'><div className='flex justify-center items-center gap-3'>{item.password}<FaCopy className='cursor-pointer' onClick={() => { copyText(item.password) }} /></div></td>

                                        <td className='sm:p-2 text-center border-b border-r border-black'>
                                            <div className='flex justify-center items-center gap-3'>
                                                <FaEdit className='cursor-pointer text-xl' onClick={() => { editPassword(item.id) }} />
                                                <MdDelete className='cursor-pointer text-xl' onClick={() => { deletePassword(item.id) }} />

                                            </div>
                                        </td>

                                    </tr>)
                            })}

                        </tbody>
                    </table>}

                    </div>

                    {/* {passwordArray.length !== 0 && <table className="table-auto w-full overflow-hidden rounded-md">
                        <thead className='bg-green-500 '>
                            <tr>
                                <th className='p-2 border-b border-black'>Site Name</th>
                                <th className='p-2 border-b border-r border-l border-black'>Username</th>
                                <th className='p-2 border-b border-black'>Password</th>
                                <th className='p-2 border-b border-l border-black'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>

                            {passwordArray.map((item) => {
                                return (
                                    <tr key={item.site}>
                                        <td className='p-2 text-center border-b border-l border-black'><div className='flex justify-center items-center gap-3'><a target="_blank" href={item.site}>{item.site}</a> <FaCopy className='cursor-pointer' onClick={() => { copyText(item.site) }} /> </div></td>
                                        <td className='p-2 text-center border-b border-r border-l border-black'><div className='flex justify-center items-center gap-3'>{item.username}<FaCopy className='cursor-pointer' onClick={() => { copyText(item.username) }} /></div></td>
                                        <td className='p-2 text-center border-b border-r border-black'><div className='flex justify-center items-center gap-3'>{item.password}<FaCopy className='cursor-pointer' onClick={() => { copyText(item.password) }} /></div></td>

                                        <td className='p-2 text-center border-b border-r border-black'>
                                            <div className='flex justify-center items-center gap-3'>
                                                <FaEdit className='cursor-pointer text-xl' onClick={() => { editPassword(item.id) }} />
                                                <MdDelete className='cursor-pointer text-xl' onClick={() => { deletePassword(item.id) }} />

                                            </div>
                                        </td>

                                    </tr>)
                            })}

                        </tbody>
                    </table>} */}
                </div>


            </div>




        </div>
    )
}

export default Manager