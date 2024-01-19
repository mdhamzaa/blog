import React from 'react';
const Comment = () => {
    return (

        <div className="border rounded-md p-3 ml-3 my-3">
            <div className="flex gap-3 items-center">
                <img
                    src="https://avatars.githubusercontent.com/u/22263436?v=4"
                    className="h-10 w-10 rounded-full mr-2 object-cover"
                />

                <div>
                    <p className="font-semibold  text-sm">Hamza</p>
                    <p className="font-semibold text-gray-400 text-xs">11:12:12</p>
                </div>
            </div>
            <p className="text-gray-600 mt-2">this is sample comment</p>
        </div>


    );
};

export default Comment;
