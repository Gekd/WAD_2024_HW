//const localJSONPath = './data/user_data.json';


const onlineJSONPath = 'https://api.npoint.io/55da728bbd8dbc350d90';

document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
});

async function fetchPosts() {
    try {
        // Fetch from the local JSON file
        const response = await fetch(onlineJSONPath);// change this to fetch from the local JSON file for testing
        const data = await response.json();
        renderPosts(data.user_feed);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

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
function showUserInfo(userImage, userName, userEmail) {
    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';
    userInfo.textContent = `${userName} - ${userEmail}`;
    userInfo.style.position = 'absolute';
    userInfo.style.backgroundColor = '#f1f1f1';
    userInfo.style.padding = '5px';
    userInfo.style.borderRadius = '5px';

    userImage.parentElement.appendChild(userInfo);
    userImage.userInfoElement = userInfo;
}

function hideUserInfo(userImage) {
    if (userImage.userInfoElement) {
        userImage.userInfoElement.remove();
        delete userImage.userInfoElement;
    }
}
