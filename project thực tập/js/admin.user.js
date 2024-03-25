function renderUser() {
    // lấy thông tin user từ localstorage về
    const users = JSON.parse(localStorage.getItem("user")) || []

    // Biến để lưu trữ từng hàng của bảng 
    let rowTable = "";

    for (let i = 0; i < users.length; i++){
        rowTable += `
            <tr>
                <td>${i + 1}</td>
                <td>${users[i].id}</td>
                <td>${users[i].firstName + users[i].lastname}</td>
                
                <td>${users[i].emailAddress}</td>
            
                <td><button class="online">${
                users[i].receive == "true" ? "Đang hoạt động" : "Đã bị khóa"
                }</button></td>
            </tr>
        `;      
    }
    document.getElementById("tbody").innerHTML = rowTable;
}

renderUser();