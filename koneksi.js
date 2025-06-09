import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Mengatasi error CORS
app.use(express.json()); // Untuk parsing body JSON jika diperlukan

// Koneksi database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '22032005',
  database: 'pet_warehouse',
});

connection.connect(err => {
  if (err) {
    console.error('Gagal koneksi database:', err);
    process.exit(1);
  } else {
    console.log('Database connected!');
  }
});

// Fungsi ambil data pet
function getPetData(callback) {
  const query = `
    SELECT 
      p.id_pet, p.name AS name_pet, p.type, p.breed, p.age, p.status,
      u.id_user, u.name AS name_user, u.gender
    FROM PET p
    JOIN user u ON p.id_user = u.id_user
  `;
  connection.query(query, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
}
// Fungsi ambil data user
function getUserData(callback) {
  const query = `SELECT * FROM user;`;
  connection.query(query, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
}
// Fungsi ambil data produk
function getProductData(callback) {
  const query = `SELECT * FROM product;`;
  connection.query(query, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
}
// Fungsi ambil data groomer
function getGroomerData(callback) {
  const query = `SELECT * FROM groomer;`;
  connection.query(query, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
}
// Fungsi ambil data hotel
function getHotelData(callback) {
  const query = `SELECT * FROM hotel;`;
  connection.query(query, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
}
// Fungsi ambil data veterinarian
function getVeterinarianData(callback) {
  const query = `SELECT * FROM veterinarian;`;
  connection.query(query, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
}
// Fungsi ambil data veterinarian
function getTimeData(callback) {
  const query = `SELECT * FROM time;`;
  connection.query(query, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
}
// Endpoint API
app.get('/api/pet', (req, res) => {
  getPetData((err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(data);
  });
});
app.get('/api/user', (req, res) => {
  getUserData((err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(data);
  });
});
app.get('/api/product', (req, res) => {
  getProductData((err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(data);
  });
});
app.get('/api/groomer', (req, res) => {
  getGroomerData((err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(data);
  });
});
app.get('/api/hotel', (req, res) => {
  getHotelData((err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(data);
  });
});
app.get('/api/veterinarian', (req, res) => {
  getVeterinarianData((err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(data);
  });
});
app.get('/api/time', (req, res) => {
  getTimeData((err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(data);
  });
});

// Fungsi ambil data adoption
function getAdoptionData(callback) {
  const query = `SELECT 
        a.id_adoption,
        a.datetime,

        -- Biodata User Owner
        uo.id_user AS id_user_owner,
        uo.name AS name_owner,

        -- Biodata User Adoption
        ua.id_user AS id_user_adopter,
        ua.name AS name_adopter,

        -- Data Hewan
        p.id_pet,
        p.name AS pet_name,
        p.type,
        p.breed,
        p.age

    FROM adoption a
    JOIN user uo ON a.id_user_owner = uo.id_user
    JOIN user ua ON a.id_user_adopter = ua.id_user
    JOIN pet p ON a.id_pet = p.id_pet;`
  connection.query(query, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
}
// Fungsi ambil data shopping
function getShoppingData(callback) {
  const query = `SELECT 
          shop.id_shop,
          shop.datetime,
          shop.payment,
          
          user.id_user,
          user.name AS name_user,
          user.address,

          shop_detail.id_detail,
          shop_detail.id_product,
          shop_detail.quantity,
          shop_detail.total,

          product.brand,
          product.category,
          product.description,
          product.stock,
          product.price

      FROM shop
      JOIN user ON shop.id_user = user.id_user
      JOIN shop_detail ON shop.id_shop = shop_detail.id_shop
      JOIN product ON shop_detail.id_product = product.id_product;`
  connection.query(query, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
}
// Fungsi ambil data grooming
function getGroomingData(callback) {
  const query = `SELECT 
      grooming.id_grooming,
          grooming.datetime,
          grooming.payment,
          
          user.id_user,
          user.name AS name_user,
          user.gender,
          user.birth_date,
          user.address,
          
          pet.id_pet,
          pet.name AS name_pet,
          pet.type,
          pet.breed,
          pet.age,
          pet.status,
          
          groomer.id_groomer,
          groomer.name AS name_groomer,
          groomer.experience,
          groomer.rating

      FROM grooming
      JOIN user ON grooming.id_user = user.id_user
      JOIN pet ON grooming.id_pet = pet.id_pet
      JOIN groomer ON grooming.id_groomer = groomer.id_groomer;`
  connection.query(query, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
}
// Fungsi ambil data Boarding
function getBoardingData(callback) {
  const query = `SELECT 
          boarding.id_boarding,
          boarding.checkin,
          boarding.checkout,
          boarding.payment,
          
          user.id_user,
          user.name AS name_user,
          user.gender,
          user.birth_date,
          user.address,
          
          pet.id_pet,
          pet.name AS name_pet,
          pet.type,
          pet.breed,
          pet.age,
          pet.status,
          
          hotel.id_hotel,
          hotel.name AS name_hotel,
          hotel.capacity,
          hotel.price

      FROM boarding
      JOIN user ON boarding.id_user = user.id_user
      JOIN pet ON boarding.id_pet = pet.id_pet
      JOIN hotel ON boarding.id_hotel = hotel.id_hotel;`
  connection.query(query, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
}
// Fungsi ambil data Consultation
function getConsultationData(callback) {
  const query = `SELECT 
          consultation.id_consultation,
          consultation.datetime,
          consultation.notes,
          consultation.payment,
          
          user.id_user,
          user.name AS name_user,
          
          pet.id_pet,
          pet.name AS name_pet,
          pet.type,
          pet.breed,
          pet.age,
          
          veterinarian.id_vet,
          veterinarian.name AS name_vet,
          veterinarian.specialization,
          veterinarian.rating

      FROM consultation
      JOIN user ON consultation.id_user = user.id_user
      JOIN pet ON consultation.id_pet = pet.id_pet
      JOIN veterinarian ON consultation.id_vet = veterinarian.id_vet;`
  connection.query(query, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
}
// Endpoint API
app.get('/api/adoption', (req, res) => {
  getAdoptionData((err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(data);
  });
});
app.get('/api/shop', (req, res) => {
  getShoppingData((err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(data);
  });
});
app.get('/api/grooming', (req, res) => {
  getGroomingData((err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(data);
  });
});
app.get('/api/boarding', (req, res) => {
  getBoardingData((err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(data);
  });
});
app.get('/api/consultation', (req, res) => {
  getConsultationData((err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(data);
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});