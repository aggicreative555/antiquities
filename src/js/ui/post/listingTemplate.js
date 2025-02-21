import { readListing, readMultipleListings } from "../../api/listings/read";
import { formatDate } from "../../utilities/formatDate";

const placeholderImages = [
  'https://images.unsplash.com/photo-1552648808-d31a8783a0af?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1627307284579-327ea0c7de14?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1592304502437-178c9adcf9ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586115180241-b3e4f01ed837?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export function postTemplate(postData) {
  const data = postData.data || postData;

  const listing = document.createElement("div");
  listing.className = "";

  
  const imageContainer = document.createElement("div");
  imageContainer.className = "w-100 h-100 img-thumbnail";

  
  // Add media if available

  const imageUrl =  Array.isArray(data.media) && data.media.length > 0
  ? data.media[0].url 
  : placeholderImages[Math.floor(Math.random() * placeholderImages.length)];

  imageContainer.style.backgroundImage = `url('${imageUrl}')`;


  imageContainer.setAttribute("aria-label", data.media?.[0]?.alt || "Post image without description");

  listing.appendChild(imageContainer);


  // Add seller
  const seller = document.createElement('h3');
  seller.className = '';
  seller.textContent = data.seller?.name || "anonymous";
  listing.appendChild(seller);

  
  // Add title
  const title = document.createElement("h4");
  title.className = "";
  title.textContent = data.title || "Untitled";
  listing.appendChild(title);

  // Add description
  const description = document.createElement("div");
  description.className = "";
  description.textContent = data.description || "No description";
  listing.appendChild(description);

  // Add bids

  const bidCount = document.createElement("p");
  bidCount.className = "";
  bidCount.textContent = data._count.bids || "0";
  listing.appendChild(bidCount);

  // Add deadline
  
  const deadLine = document.createElement("p");
  deadLine.className = "";
  deadLine.textContent = `Ends at: ${formatDate(data.endsAt)}`;
  listing.appendChild(deadLine);
  
  
  const viewListingButton = document.createElement("button");
  viewListingButton.className = "";
  viewListingButton.textContent = "See full listing";
  listing.appendChild(viewListingButton);
  
  viewListingButton.addEventListener("click", () => {
    const postId = data.id;

    if (postId) {
      window.location.href =`/listings/?id=${postId}`;
    }
  });

  // hoverOverlay.appendChild(hoverUsername);
  // hoverOverlay.appendChild(hoverTitle);
  // hoverOverlay.appendChild(description);
  // post.appendChild(hoverOverlay);

  // post.addEventListener("mouseenter", () => {
  //   contentOverlay.style.opacity = "0";
  //   hoverOverlay.style.opacity = "1";
  // });

  // post.addEventListener("mouseleave", () => {
  //   contentOverlay.style.opacity = "1";
  //   hoverOverlay.style.opacity = "0";
  // });

  // return post;
  return listing;
}

