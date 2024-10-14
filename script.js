document.addEventListener('DOMContentLoaded', () => {  
    const contactForm = document.getElementById('contactForm');  
    const contactList = document.getElementById('contactList');  
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];  
  
    // 渲染联系人列表  
    function renderContacts() {  
        contactList.innerHTML = '';  
        contacts.forEach((contact, index) => {  
            const li = document.createElement('li');  
            li.textContent = `${contact.name} - ${contact.phone} - ${contact.email}`;  
  
            const editButton = document.createElement('button');  
            editButton.textContent = '编辑';  
            editButton.onclick = () => editContact(index);  
  
            const deleteButton = document.createElement('button');  
            deleteButton.textContent = '删除';  
            deleteButton.onclick = () => deleteContact(index);  
  
            li.appendChild(editButton);  
            li.appendChild(deleteButton);  
            contactList.appendChild(li);  
        });  
    }  
  
    // 添加/修改联系人  
    contactForm.onsubmit = (e) => {  
        e.preventDefault();  
        const name = document.getElementById('name').value;  
        const phone = document.getElementById('phone').value;  
        const email = document.getElementById('email').value;  
  
        const formData = { name, phone, email };  
  
        const editIndex = parseInt(contactForm.getAttribute('data-edit-index')) || -1;  
        if (editIndex !== -1) {  
            contacts[editIndex] = formData;  
        } else {  
            contacts.push(formData);  
        }  
  
        localStorage.setItem('contacts', JSON.stringify(contacts));  
        renderContacts();  
        contactForm.reset();  
        contactForm.removeAttribute('data-edit-index');  
    };  
  
    // 编辑联系人  
    function editContact(index) {  
        const contact = contacts[index];  
        document.getElementById('name').value = contact.name;  
        document.getElementById('phone').value = contact.phone;  
        document.getElementById('email').value = contact.email;  
        contactForm.setAttribute('data-edit-index', index);  
    }  
  
    // 删除联系人  
    function deleteContact(index) {  
        contacts.splice(index, 1);  
        localStorage.setItem('contacts', JSON.stringify(contacts));  
        renderContacts();  
    }  
  
    // 初始渲染  
    renderContacts();  
});