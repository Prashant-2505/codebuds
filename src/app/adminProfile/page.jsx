'use client'
import { Tabs, Tab, Card, CardBody, Button, Select, SelectItem } from "@nextui-org/react";


// Import statements
import { useAuth } from '@/context/authContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AdminProfile = () => {
    // Styles

    // Authentication and routing
    const [auth, setAuth] = useAuth();
    const router = useRouter();


    // input states
    const [topic, setTopic] = useState("");
    const [pattern, setPattern] = useState("");
    const [questionName, setQuestionName] = useState("");
    const [questionLink, setQuestionLink] = useState("");
    const [questionDescription, setQuestionDescription] = useState("");

    const [company, setCompany] = useState("");
    const [selectedCompanies, setSelectedCompanies] = useState([]);

    // fetched data states
    const [allTopic, setAllTopic] = useState([]);
    const [allPattern, setAllPattern] = useState([])

    // selected states
    const [selectedTopic, setSelectedTopic] = useState("")
    const [selectedPattern, setSelectedPattern] = useState("")


    // Function to handle logout
    const handleLogout = async () => {
        try {
            const { data } = await axios.get('api/auth/logout');
            if (data.success) {
                setAuth(null);
                localStorage.removeItem('auth');
                alert('Logged out');
                router.push('/login');
            }
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    };
    // Function to add a topic
    const addTopic = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/dsa/topic', { topic }, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (data.success) {
                alert(data.message)
            }
            else {
                alert(data.message)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // Function to add a pattern
    const addPattern = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/dsa/pattern/createPattern', { pattern, topic: selectedTopic }, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (data.success) {
                alert(data.message)
            }
            else {
                alert(data.message)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    //function to fetch all topic
    const getAllTopic = async () => {
        const { data } = await axios.get('/api/dsa/topic/alltopic')
        if (data.success) {
            setAllTopic(data?.topics)
        }
    }
    useEffect(() => {
        getAllTopic()
    }, [])
    // function to get all pattern
    const getAllPattern = async () => {
        const { data } = await axios.post('/api/dsa/pattern/getAllPattern', { topic: selectedTopic }, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (data.success) {
            setAllPattern(data.patterns)
        }
    }
    useEffect(() => {
        getAllPattern()
    }, [selectedTopic])

    // function to add question
    const addQuestion = async (e) => {
        e.preventDefault()
        const { data } = await axios.post('/api/dsa/question/addQuestion',
            { topic: selectedTopic, pattern: selectedPattern, questionName, questionLink, questionDescription, company: selectedCompanies, },
            {
                headers: { 'Content-Type': 'application/json' }
            })
        if (data.success) {
            alert("question added succesfully")
        }
    }


    const [selected, setSelected] = React.useState("photos");







    return (
        <div className='pt-[7rem] text-center'>
            {/* Header */}

            <h1 className='font-bold text-[2rem] py-2'>Welcome</h1>
            <h2 className='font-semibold text-[1rem] capitalize'>{auth?.user?.name}</h2>

            {/* Logout button */}
            <button
                className='border-2 mt-8 px-6 py-3 rounded-md bg-red-400 text-[1.3rem] hover:bg-red-500'
                onClick={() => handleLogout()}
            >
                logout
            </button>

            {/* Main content */}
            <div className=" my-10  ">
                <div className="flex w-full flex-col">
                    <Tabs className=" "
                        aria-label="Options"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                    >
                        <Tab key="addTopic" title="Add Topics">
                            <Card className=" bg-red-400 min-h-[20vh]" >
                                <CardBody className="w-full flex justify-between items-center">
                                    <form onSubmit={addTopic}
                                        className=" w-[50%] flex flex-col gap-[5rem] justify-center items-center rounded-md">
                                        <input className="w-[100%] px-4 py-3 rounded-md outline-none"
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            placeholder="Add topic"
                                            type="text" />

                                        <Button type="submit">
                                            SUbmit
                                        </Button>
                                    </form>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="addPattern" title="Add Pattern">
                            <Card className=" bg-red-400 min-h-[40vh]" >
                                <CardBody className="w-full flex justify-between items-center">
                                    <form onSubmit={addPattern}
                                        className=" w-[50%] flex flex-col gap-[4rem] justify-center items-center rounded-md">
                                        <div className=" space-y-8">
                                            <Select
                                                label="Topic"
                                                placeholder="Select a Topic"
                                                className="w-full"
                                            >
                                                {allTopic.map((topic) => (
                                                    <SelectItem onClick={() => setSelectedTopic(topic._id)} key={topic._id} >
                                                        {topic.topic}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                            <input className="w-[100%] px-4 py-3 rounded-md outline-none"
                                                value={pattern}
                                                onChange={(e) => setPattern(e.target.value)}
                                                placeholder="Add Pattern"
                                                type="text" />

                                        </div>

                                        <Button type="submit">
                                            SUbmit
                                        </Button>
                                    </form>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="addQuestion" title="Add Question">
                            <Card className=" bg-red-400 min-h-[20vh]" >
                                <CardBody>
                                    <CardBody className="w-full flex justify-between items-center">
                                        <form
                                            className=" w-[50%] flex flex-col gap-[4rem] justify-center items-center rounded-md">
                                            <div className=" space-y-8">
                                                <Select
                                                    label="Topic"
                                                    placeholder="Select a Topic"
                                                    className="w-full"
                                                >
                                                    {allTopic.map((topic) => (
                                                        <SelectItem onClick={() => setSelectedTopic(topic._id)} key={topic._id} >
                                                            {topic.topic}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                                <Select
                                                    label="Pattern"
                                                    placeholder="Select a Pattern"
                                                    className="w-full"
                                                >
                                                    {allPattern.map((pattern) => (
                                                        <SelectItem onClick={() => setSelectedPattern(pattern._id)} key={pattern._id} >
                                                            {pattern.pattern}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                                <input className="w-[100%] px-4 py-3 rounded-md outline-none"
                                                    value={questionName}
                                                    onChange={(e) => setQuestionName(e.target.value)}
                                                    placeholder="Add Question"
                                                    type="text" />
                                                <input className="w-[100%] px-4 py-3 rounded-md outline-none"
                                                    value={questionLink}
                                                    onChange={(e) => setQuestionLink(e.target.value)}
                                                    placeholder="Add Question Link"
                                                    type="text" />
                                                <div>
                                                    <input
                                                        className="w-[100%] px-4 py-3 rounded-md outline-none"
                                                        value={company}
                                                        onChange={(e) => setCompany(e.target.value)}
                                                        placeholder="Add Company"
                                                        type="text"
                                                    />
                                                    <Button onClick={() => setSelectedCompanies((prevCompanies) => [...prevCompanies, company])}>
                                                        Add Company
                                                    </Button>
                                                    <div>
                                                        {selectedCompanies.map((selectedCompany, index) => (
                                                            <span key={index}>{selectedCompany}, </span>
                                                        ))}
                                                    </div>

                                                </div>
                                                <textarea className="w-full" value={questionDescription}
                                                    onChange={(e) => setQuestionDescription(e.target.value)}
                                                ></textarea>

                                            </div>

                                            <Button onClick={addQuestion}>
                                                SUbmit
                                            </Button>
                                        </form>
                                    </CardBody>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="view" title="View">
                            <Card className=" bg-red-400 min-h-[20vh]" >
                                <CardBody>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;