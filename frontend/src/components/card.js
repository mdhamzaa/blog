const img =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&psig=AOvVaw3TXU4ypdRCSnK7W-5l7Qhb&ust=1705307719339000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCKCiz7q83IMDFQAAAAAdAAAAABAE";
function Card() {
  const title = {
    name: "Iphone 12",
    image: "../assets/hero.png",
    description: "This is a very good phone",
    price: "120000",
  };

  return (
    <>
      <div class="">
        <div class="overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-5 hover:shadow-2xl rounded-lg w-45 px-10 mb-20 cursor-pointer m-auto ">
          <img
            alt="blog photo"
            src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
            class="max-h-70 w-full object-cover"
          />
          <div class="bg-white w-full p-4">
            <p class="text-indigo-500 text-2xl font-medium">
              Should You Get Online Education?
            </p>
            <p class="text-gray-800 text-sm font-medium mb-2">
              A comprehensive guide about online education.
            </p>
            <p class="text-gray-600 font-light text-md">
              It is difficult to believe that we have become so used to having
              instant access to information at...
              <a class="inline-flex text-indigo-500 mb-10" href="#">
                Read More
              </a>
            </p>

            <div class="flex items-center mt-2">
              <img
                class="w-10 h-10 object-cover rounded-full"
                alt="User avatar"
                src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
              />

              <div class="flex pl-3   space-x-2">
                <div class="font-medium mr-12">
                  Jean Marc
                  <div class="text-gray-600 text-sm">CTO of Supercars</div>
                </div>

                <div class="flex justify-end ">
                  <div class="flex space-x-1 items-center">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-7 w-7 text-gray-600 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </span>
                    <span>22</span>
                  </div>
                  <div class="flex space-x-1 items-center">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                    <span>20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
