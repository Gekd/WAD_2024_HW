// Static JSON data
const userData = {
    "user_name": "John Doe",
    "user_email": "john.doe@ut.ee",
    "user_feed": [
        {
            "user_image": null,
            "date": "2024-09-28",
            "post_image": "https://tartu2024.ee/wp-content/uploads/2023/10/maamark-0009-3U5A5915-1-2560x1707.jpg",
            "post_text": "Tartu 2024",
            "like_count": 3
        },
        {
            "user_image": null,
            "date": "2024-08-02",
            "post_image": null,
            "post_text": "Anyone knows in which room is the lab today?",
            "like_count": null
        },
        {
            "user_image": null,
            "date": "2024-10-22",
            "post_image": null,
            "post_text": "Today is a good day",
            "like_count": 101
        },
        {
            "user_image": null,
            "date": "2024-10-22",
            "post_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuRArczmspQJWsK7A9Szu_w_MQP0-yCiiIbA&s",
            "post_text": "Meme of the day",
            "like_count": 15
        },
        {
            "user_image": null,
            "date": "2024-01-16",
            "post_image": "https://plaky.com/blog/wp-content/uploads/2023/08/Intro.jpg",
            "post_text": null,
            "like_count": 39
        },
        {
            "user_image": null,
            "date": "2024-09-10",
            "post_image": "https://www.shutterstock.com/shutterstock/videos/1084338925/thumb/5.jpg?ip=x480",
            "post_text": "Today's weather is sunny and temperature is about 8 degrees Celsius.",
            "like_count": 12
        },
        {
            "user_image": null,
            "date": "2024-02-24",
            "post_image": "https://deepbaltic.com/wp-content/uploads/2016/05/flag-of-estonia-proposed-in-1919-940x598.png",
            "post_text": "New flag for Estonia?",
            "like_count": 1
        },
        {
            "user_image": null,
            "date": "2024-06-04",
            "post_image": null,
            "post_text": "I can't exit Vim",
            "like_count": 374
        },
        {
            "user_image": null,
            "date": "2024-07-13",
            "post_image": null,
            "post_text": "Friday the 13th",
            "like_count": null
        },
        {
            "user_image": null,
            "date": "2024-10-16",
            "post_image": "https://preview.redd.it/is-this-a-feature-v0-e3ceg1qpxtvd1.jpeg?auto=webp&s=56f8efa043adf304751e2551e4a79c4fd57fb841",
            "post_text": null,
            "like_count": 88
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    renderPosts(userData.user_feed); // Use static data directly
});

function renderPosts(posts) {
    const postsColumn = document.querySelector('.posts-column');
    postsColumn.innerHTML = ''; // Clear any existing content

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        // Create post header with user image and date
        const postHeader = document.createElement('div');
        postHeader.className = 'post-header';

        const userImage = document.createElement('img');
        userImage.src = post.user_image || 'images/person-circle.svg'; // Default icon if user image is missing
        userImage.alt = 'User icon';
        userImage.className = 'post-header';

        const postDate = document.createElement('p');
        postDate.textContent = new Date(post.date).toLocaleDateString();

        postHeader.appendChild(userImage);
        postHeader.appendChild(postDate);
        postElement.appendChild(postHeader);

        // Add post image if there is any
        if (post.post_image) {
            const postImage = document.createElement('img');
            postImage.src = post.post_image;
            postImage.alt = 'Post image';
            postImage.className = 'post-image';
            postElement.appendChild(postImage);
        }

        // Add post text if if there is any
        if (post.post_text) {
            const postText = document.createElement('p');
            postText.textContent = post.post_text;
            postElement.appendChild(postText);
        }

        // Add likes icon and count if there are any
        const postLike = document.createElement('img');
        postLike.src = 'images/thumbs-up.svg';
        postLike.alt = 'Like icon';
        postLike.className = 'post-like';
        postElement.appendChild(postLike);

        if (post.like_count) {
            const likeCount = document.createElement('span');
            likeCount.textContent = ` ${post.like_count} likes`;
            postElement.appendChild(likeCount);
        }

        postsColumn.appendChild(postElement);
    });
}
