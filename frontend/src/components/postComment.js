import React from 'react';
const PostComment = () => {
    return (
        <form>
            <div className="w-full px-3 my-2">
                <textarea
                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                    name="body"
                    placeholder="Type Your Comment"
                    required
                ></textarea>
            </div>
            <div className="w-full flex justify-end px-3">
                <input
                    type="submit"
                    className="px-2.5 py-1.5 rounded-md text-white text-sm bg-blue-500 mb-10 hover:bg-blue-600"
                    value="Post Comment"
                />
            </div>
        </form>
    );
};

export default PostComment;
