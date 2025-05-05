async function searchBooks() {
    const query = document.getElementById("searchInput").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "Searching...";
  
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`);
      const data = await response.json();
  
      if (data.docs.length === 0) {
        resultsDiv.innerHTML = "No results found.";
        return;
      }
  
      const books = data.docs.slice(0, 10).map(book => {
        const title = book.title || "No Title";
        const author = book.author_name ? book.author_name.join(", ") : "Unknown Author";
        const year = book.first_publish_year || "Unknown Year";
        const olid = book.key; // e.g., "/works/OL12345W"
        const link = `https://openlibrary.org${olid}`;
  
        return `
          <div>
            <strong>${title}</strong> by ${author}<br>
            <em>First published:</em> ${year}<br>
            <a href="${link}" target="_blank">View on Open Library</a>
          </div><hr>
        `;
      });
  
      resultsDiv.innerHTML = books.join("");
    } catch (error) {
      resultsDiv.innerHTML = "Error fetching results.";
      console.error(error);
    }
  }
  
