import chicken_wings from '@/foodImages/Chicken-Wings.webp'
import paneer_butter_masala from '@/foodImages/Paneer-Butter-Masala.webp'
import gulab_jamun from '@/foodImages/Gulab-Jamun.webp'
import mojito from '@/foodImages/Mojito.webp'
import mashed_potatoes from '@/foodImages/Mashed-Potatoes.webp'
import tiramisu from '@/foodImages/tiramisu.webp'
import french_fries from '@/foodImages/french-fries.webp'
import garlic_bread from '@/foodImages/garlic-bread.webp'


const foodCategories = [
  {
    category: "Appetizer",
    imageUrl: chicken_wings,
  },

  {
    category: "Main-course",
    imageUrl: paneer_butter_masala
  },
  {
    category: "Dessert",
    imageUrl: tiramisu
  },
  {
    category: "Beverages",
    imageUrl: mojito
  },
  {
    category: "Side-dish",
    imageUrl: garlic_bread
  }
]

const foods = [
  {
    id: 1,
    name: "Spring Rolls",
    description:
      "Crispy rolls stuffed with mixed vegetables and served with a tangy dipping sauce.",
    price: 8,
    category: "Appetizer",
    imageUrl:
      "https://imgs.search.brave.com/FJzgGgghmhiVeLRqogcnTwvEFGOxvcCW9kjUaSW4HLQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEy/NTk1MDMxMS9waG90/by9zcHJpbmctcm9s/bC1hbmQtc295LXNh/dWNlLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1BeFN0Rzh1/akZNRVF5MDJSTFIt/WjlSQnVhUk1ZYVMz/UVBfQmtXRHFXd0s0/PQ",
  },
  {
    id: 2,
    name: "Stuffed Mushrooms",
    description:
      "Button mushrooms filled with a cheesy herb stuffing and baked to perfection.",
    price: 9,
    category: "Appetizer",
    imageUrl:
      "https://imgs.search.brave.com/IPybk60rBrSLY-NeBZNMZOBcmq8GQQkJAhDwqovhus4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMi53/cC5jb20vd3d3LmRv/d25zaGlmdG9sb2d5/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMy8xMC9TdHVm/ZmVkLU11c2hyb29t/cy02LmpwZw",
  },
  {
    id: 3,
    name: "Bruschetta",
    description:
      "Toasted bread topped with fresh tomatoes, basil, and olive oil.",
    price: 7,
    category: "Appetizer",
    imageUrl:
      "https://imgs.search.brave.com/88HYfbmikzahf0Mcf9gM1_sgadh5UEMv6JvbFvyI4aw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzA0LzI2LzMw/LzM2MF9GXzYwNDI2/MzA4M19saDg4bEdj/cVcxVVViaWw3TWl1/aE1JRlV5cWoxNkRS/Si5qcGc",
  },
  {
    id: 4,
    name: "Chicken Wings",
    description: "Spicy and tangy chicken wings served with ranch dip.",
    price: 10,
    category: "Appetizer",
    imageUrl:
      "https://imgs.search.brave.com/6E2RuMHjj3QPoBGU1km3XZvQqsf3fkvc_3fPDt_sGgY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzMxLzQ1LzI5/LzM2MF9GXzYzMTQ1/Mjk3OF80N3c1NmtJ/Ulh4ajNyVU5ZUWlN/RUxxNm00Uko5ZDlP/MC5qcGc",
  },
  {
    id: 5,
    name: "Chicken Biryani",
    description: "Aromatic rice cooked with tender chicken, spices, and herbs.",
    price: 15,
    category: "Main-course",
    imageUrl:
      "https://imgs.search.brave.com/wRevVKzFdPkjLoUOeITnmzctSB2arYLHHFLcnobG1_s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA1/ODAyOTA5Ni9waG90/by9jaGlja2VuLWJp/cnlhbmkuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXlWVjFS/QXJrWXoxZlhmMEJs/cGV1d3h0MHlUSEhE/bmxPVVJWTUptWWdB/ZUk9",
  },
  {
    id: 6,
    name: "Grilled Salmon",
    description:
      "Juicy salmon fillet grilled with herbs and served with a side of veggies.",
    price: 20,
    category: "Main-course",
    imageUrl:
      "https://imgs.search.brave.com/JG-JoLnRtBN-bZSftp1rDYW7pAQREynN9TqAYq746dc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzU0LzMwLzUx/LzM2MF9GXzU0MzA1/MTk0XzFuUDcwcHln/NUpibVIxeldpSzNJ/UEpuN1BlemY1N3N4/LmpwZw",
  },
  {
    id: 7,
    name: "Paneer Butter Masala",
    description: "Creamy tomato-based curry with soft paneer cubes.",
    price: 14,
    category: "Main-course",
    imageUrl:
      "https://imgs.search.brave.com/8wBl7BStVUoDAxGzHOOLZ3q6b6bnZKGFBzRWRxG-0Dc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzQzLzQ5LzI1/LzM2MF9GXzg0MzQ5/MjU0MV82d2hnekVm/Z3BDRXJpeW1NcE5U/dHY1dGRiaTFRSUNG/Yy5qcGc",
  },
  {
    id: 8,
    name: "Beef Steak",
    description:
      "Perfectly cooked steak served with mashed potatoes and veggies.",
    price: 22,
    category: "Main-course",
    imageUrl:
      "https://imgs.search.brave.com/rWUYUHBxlaQddySHlxGKEoLWBxsp6srd2Y4aCSpN55Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTMx/NDY0MzY2L3Bob3Rv/L2JlZWYtc3RlYWtz/LW9uLXRoZS1ncmls/bC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9Z1A1VmlHbkow/OFlUelh0aFNPTUt6/WkVNcXRBYmNNMmpo/RWFvMDlXMWtBUT0",
  },
  {
    id: 9,
    name: "Chocolate Lava Cake",
    description:
      "Rich chocolate cake with a molten center served warm with vanilla ice cream.",
    price: 10,
    category: "Dessert",
    imageUrl:
      "https://imgs.search.brave.com/kibMa8lbPjD7fabaqa-FDmugIUWZxYW1G_sHVDWC9Nc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zYWxs/eXNiYWtpbmdhZGRp/Y3Rpb24uY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzAy/L2Nob2NvbGF0ZS1s/YXZhLWNha2VzLTIu/anBn",
  },
  {
    id: 10,
    name: "Tiramisu",
    description:
      "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone.",
    price: 12,
    category: "Dessert",
    imageUrl:
      "https://imgs.search.brave.com/rkszT54k8gI3u29aggV5hPkIH8xzsm8K0NASWk8oBMo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQy/MjE2MzI2NS9waG90/by90aXJhbWlzdS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/YzV1eGhoNUJhOGdG/cmFXSTFlMDlFMGhX/LUxZYnNQX0RaYUlx/REw5VGhEST0",
  },
  {
    id: 11,
    name: "Apple Pie",
    description:
      "Traditional pie filled with spiced apples and baked until golden brown.",
    price: 9,
    category: "Dessert",
    imageUrl:
      "https://imgs.search.brave.com/mlA96e2ZQb0aiq236LJv9m60aBpZoQ7P5k5pU6gj-cg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzEyLzg1LzU4/LzM2MF9GXzIxMjg1/NTgyMl8wVHBYY1Vn/M2pYMWdXTmxSMFhK/THc4dXBsTVRzY01z/VC5qcGc",
  },
  {
    id: 12,
    name: "Gulab Jamun",
    description: "Soft dumplings soaked in rose-flavored sugar syrup.",
    price: 6,
    category: "Dessert",
    imageUrl:
      "https://imgs.search.brave.com/BjrlTOa_wYypiPOzZxttB3Z-rPuAiveI5YeIOqk-WOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9pbmRpYW4tdHJh/ZGl0aW9uYWwtc3dl/ZXQtZ3VsYWItamFt/dW4tYmxhY2stdGFi/bGVfMTIzNDczOC0z/ODU2MzMuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZA",
  },
  {
    id: 13,
    name: "Mojito",
    description: "Refreshing cocktail with lime, mint, and soda water.",
    price: 5,
    category: "Beverages",
    imageUrl:
      "https://imgs.search.brave.com/WVw3cgbiUYI8ebR1zeZO0IaDRxN9uqssfTfg4YspH8E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGlxdW9yLmNvbS90/aG1iL01KUlZxZi1p/dEpHWTkwbndVT1lH/WG55Ry1IQT0vMTUw/MHgwL2ZpbHRlcnM6/bm9fdXBzY2FsZSgp/Om1heF9ieXRlcygx/NTAwMDApOnN0cmlw/X2ljYygpL21vaml0/by03MjB4NzIwLXBy/aW1hcnktNmE1N2Y4/MGUyMDBjNDEyZTlh/NzdhMTY4N2YzMTJm/ZjcuanBn",
  },
  {
    id: 14,
    name: "Iced Coffee",
    description: "Cold coffee served with ice and a touch of cream.",
    price: 4,
    category: "Beverages",
    imageUrl:
      "https://imgs.search.brave.com/fBrXL3Bm-a5WxnmX_gbV_y7DMZEJ7xOt3Naq1gB3yP8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU1/MzcwMTI1L3Bob3Rv/L2ljZWQtY29mZmVl/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1IM1RIaUhsNHB2/Qjh0SjZDM2VHSTJZ/RmpRS1pxWkxad0Fn/UVdfdlJqQWswPQ",
  },
  {
    id: 15,
    name: "Mango Smoothie",
    description: "Creamy mango smoothie made with fresh fruit and yogurt.",
    price: 6,
    category: "Beverages",
    imageUrl:
      "https://imgs.search.brave.com/3SftjK1Df6pacpa3CWftIYXD2aw62qq4LYDaJUW1n_Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWNvdXBsZWNvb2tz/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNi9NYW5n/by1TbW9vdGhpZS0w/MDcuanBn",
  },
  {
    id: 16,
    name: "Lemonade",
    description: "Classic lemonade made with freshly squeezed lemons.",
    price: 3,
    category: "Beverages",
    imageUrl:
      "https://imgs.search.brave.com/DVfg6_oi1uoj0QhTPW0QQ3lPdfYoetrKQe9KV4tyVss/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQw/NDk5OTE1OC9waG90/by9sZW1vbmFkZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZU5pRUV2cWpfVmh0/ZkJnTG5fVGdJUTlB/SmJ4amZMQ0dQY1Zy/WEh0Uk9OQT0",
  },
  {
    id: 17,
    name: "French Fries",
    description: "Crispy golden fries seasoned with salt.",
    price: 5,
    category: "Side-dish",
    imageUrl:
      "https://imgs.search.brave.com/Yqno4XLej0x6xMQcTJXDculh9UakUTNXQ7j5iJwKc1Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ0/Mzk5Mzg2Ni9waG90/by9mcmVuY2gtZnJp/ZXMtd2l0aC1rZXRj/aHVwLWFuZC1jb2Nr/dGFpbC1zYXVjZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/VVJwT3NjNXRkczh0/T2Z4SzRaTzNUa3g2/bXdMaG83ZkxfcFRC/U05kemlCVT0",
  },
  {
    id: 18,
    name: "Garlic Bread",
    description: "Toasted bread with garlic butter and herbs.",
    price: 6,
    category: "Side-dish",
    imageUrl:
      "https://imgs.search.brave.com/B9RTZdlkBGx6pESvxetyLfGaMxcQnpwcjSgu1e30YSw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bG92ZWFuZGxlbW9u/cy5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMTIvZ2Fy/bGljLWJyZWFkLXJl/Y2lwZS5qcGc",
  },
  {
    id: 19,
    name: "Coleslaw",
    description: "Creamy coleslaw made with fresh cabbage and carrots.",
    price: 4,
    category: "Side-dish",
    imageUrl:
      "https://imgs.search.brave.com/PBolTanbfbMMmVtqXzpQM3wjTixcODj1YVEQ9lBO6Fw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcx/MTA5MjE1L3Bob3Rv/L2NvbGVzbGF3LXNh/bGFkLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1tUnBMcG9F/NUlVcHdnRU13LTFB/QU5sbnYxSkx1aGtG/SWFzVXpQM2ZyXzgw/PQ",
  },
  {
    id: 20,
    name: "Mashed Potatoes",
    description: "Creamy mashed potatoes with a hint of butter.",
    price: 6,
    category: "Side-dish",
    imageUrl:
      "https://imgs.search.brave.com/udCaBjUwwp__c5YU5lxBv8-pnKrXPEkOaZ1PRAggnyU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzI0LzU5LzU5/LzM2MF9GXzcyNDU5/NTkwOV9ESk5BTFgx/c0Q2a09XeUE3UXRJ/cHRQODZKTjRsY0FE/YS5qcGc",
  },
];


export { foods, foodCategories}