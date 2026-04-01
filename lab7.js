document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        await searchBooks();
    });

    const searchBooks = async () => {
        const bookName = document.getElementById('bookInput').value.trim().replace(/ /g, '+');
        document.getElementById('loading').style.display = 'block';
        document.getElementById('resultsTable').style.display = 'none';

        try {
            const response = await fetch(`https://openlibrary.org/search.json?title=${bookName}`);
            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            document.getElementById('loading').style.display = 'none';
        }
    };

    const displayResults = (data) => {
        const resultsTable = document.getElementById('resultsTable');
        const tbody = resultsTable.querySelector('tbody');
        tbody.innerHTML = ''; 

      
        if (!data.docs || data.docs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="2">No books found. Please try a different title.</td></tr>';
            resultsTable.style.display = 'table';
            return;
        }

        data.docs.forEach(book => {
            const row = document.createElement('tr');

            const titleCell = document.createElement('td');
            titleCell.textContent = book.title || 'Unknown Title';

            const authorCell = document.createElement('td');
            authorCell.textContent = book.author_name ? book.author_name.join(', ') : 'Unknown Author';

            row.appendChild(titleCell);
            row.appendChild(authorCell);
            tbody.appendChild(row);
        });

        resultsTable.style.display = 'table';
    };
});