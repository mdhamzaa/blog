import React from 'react';
import Comment from '../components/comment';
import PostComment from '../components/postComment';

const BlogPage = () => {
    const title = "Sample Blog Title";
    const summary = "This is a sample blog summary.";
    const likeCount = 10;
    const createdAt = "2022-01-01";
    const content = "This is a sample blog";
    const authorname = "John Doe";
    const date = "2022-01-01";

    return (
        <>

            <div className="max-w-screen-xl mx-auto">
                <main className="mt-10">
                    <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative" style={{ height: '24em' }}>
                        <div className="absolute left-0 bottom-0 w-full h-full z-10" style={{ backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))' }}></div>
                        <img src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" className="absolute left-0 top-0 w-full h-full z-0 object-cover" alt="Background" />
                        <div className="p-4 absolute bottom-0 left-0 z-20">
                            {/* <a href="#" className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">Nutrition</a> */}
                            <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                                {title}
                            </h2>
                            <div className="flex mt-3">
                                <img src="https://randomuser.me/api/portraits/men/97.jpg" className="h-10 w-10 rounded-full mr-2 object-cover" alt="Author" />
                                <div>
                                    <p className="font-semibold text-gray-200 text-sm">{authorname}</p>
                                    <p className="font-semibold text-gray-400 text-xs">{date}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
                        <p class="pb-6">Advantage old had otherwise sincerity dependent additions. It in adapted natural hastily is
                            justice. Six draw
                            you him full not mean evil. Prepare garrets it expense windows shewing do an. She projection advantages
                            resolution son indulgence. Part sure on no long life am at ever. In songs above he as drawn to. Gay was
                            outlived peculiar rendered led six.</p>

                        <p class="pb-6">Difficulty on insensible reasonable in. From as went he they. Preference themselves me as
                            thoroughly
                            partiality considered on in estimating. Middletons acceptance discovered projecting so is so or. In or
                            attachment inquietude remarkably comparison at an. Is surrounded prosperous stimulated am me discretion
                            expression. But truth being state can she china widow. Occasional preference fat remarkably now projecting
                            uncommonly dissimilar. Sentiments projection particular companions interested do at my delightful. Listening
                            newspaper in advantage frankness to concluded unwilling.</p>



                    </div>
                </main>


                <div className="max-w-screen-xl  bg-white rounded-lg border p-2 my-4 mx-6">
                    <h3 className="font-bold">Discussion</h3>

                    <div className="flex flex-col">

                        <Comment />
                        <Comment />
                        <Comment />
                        <PostComment />
                    </div>
                </div>
            </div>








        </>
    );
};

export default BlogPage;





