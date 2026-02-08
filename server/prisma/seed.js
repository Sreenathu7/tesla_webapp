const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    // 1. Create Admin User
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@tesla.com' },
        update: {},
        create: {
            email: 'admin@tesla.com',
            name: 'Tesla Admin',
            password: adminPassword,
            role: 'ADMIN',
        },
    });

    console.log('Created Admin:', admin.email, '/ admin123');

    // 2. Clear existing cars
    await prisma.carColor.deleteMany();
    await prisma.carVariant.deleteMany();
    await prisma.car.deleteMany();

    // 3. Create Cars
    const cars = [
        {
            name: 'Model S',
            slug: 'model-s',
            base_price: 74990,
            description: 'Model S is built for speed and range, with beyond ludicrous acceleration and uncompromised design.',
            range: 405,
            top_speed: 155,
            category: 'Sedan',
            drive_train: 'Dual Motor AWD',
            acceleration: 3.1,
            variants: [
                { name: 'Dual Motor All-Wheel Drive', price: 0 },
                { name: 'Plaid', price: 15000 }
            ],
            colors: [
                { name: 'Stealth Grey', price: 0, imageUrl: 'https://images.unsplash.com/photo-1620882372565-5c1cf60aa31f?q=80&w=2070' },
                { name: 'Pearl White Multi-Coat', price: 1000, imageUrl: 'https://images.unsplash.com/photo-1620882372565-5c1cf60aa31f?q=80&w=2070' },
                { name: 'Deep Blue Metallic', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad42243c59?q=80&w=2070' },
                { name: 'Solid Black', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1620882372565-5c1cf60aa31f?q=80&w=2070' },
                { name: 'Ultra Red', price: 2500, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad42243c59?q=80&w=2070' }
            ]
        },
        {
            name: 'Model S Plaid',
            slug: 'model-s-plaid',
            base_price: 89990,
            description: 'The fastest accelerating car in production today. 0-60 mph in 1.99s.',
            range: 396,
            top_speed: 200,
            category: 'Sedan',
            drive_train: 'Tri-Motor AWD',
            acceleration: 1.99,
            variants: [
                { name: 'Plaid', price: 0 }
            ],
            colors: [
                { name: 'Solid Black', price: 0, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad42243c59?q=80&w=2070' },
                { name: 'Ultra Red', price: 2500, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad42243c59?q=80&w=2070' },
                { name: 'Stealth Grey', price: 0, imageUrl: 'https://images.unsplash.com/photo-1620882372565-5c1cf60aa31f?q=80&w=2070' }
            ]
        },
        {
            name: 'Model 3',
            slug: 'model-3',
            base_price: 38990,
            description: 'Model 3 is designed for electric efficiency, with a minimalist interior and advanced safety features.',
            range: 272,
            top_speed: 125,
            category: 'Sedan',
            drive_train: 'RWD',
            acceleration: 5.8,
            variants: [
                { name: 'Rear-Wheel Drive', price: 0 },
                { name: 'Long Range AWD', price: 8000 }
            ],
            colors: [
                { name: 'Stealth Grey', price: 0, imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071' },
                { name: 'Pearl White Multi-Coat', price: 1000, imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071' },
                { name: 'Deep Blue Metallic', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071' },
                { name: 'Solid Black', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070' },
                { name: 'Ultra Red', price: 2000, imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071' }
            ]
        },
        {
            name: 'Model 3 Performance',
            slug: 'model-3-performance',
            base_price: 52990,
            description: 'Quickest acceleration, top speed 162 mph, aluminum alloy pedals.',
            range: 303,
            top_speed: 162,
            category: 'Sedan',
            drive_train: 'Dual Motor AWD',
            acceleration: 2.9,
            variants: [
                { name: 'Performance', price: 0 }
            ],
            colors: [
                { name: 'Ultra Red', price: 0, imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071' },
                { name: 'Stealth Grey', price: 0, imageUrl: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070' }
            ]
        },
        {
            name: 'Model X',
            slug: 'model-x',
            base_price: 79990,
            description: 'Model X is built for efficiency—with an uncompromised design, allowing for ample seating and storage.',
            range: 335,
            top_speed: 149,
            category: 'SUV',
            drive_train: 'Dual Motor AWD',
            acceleration: 3.8,
            variants: [
                { name: 'Dual Motor All-Wheel Drive', price: 0 },
                { name: 'Plaid', price: 15000 }
            ],
            colors: [
                { name: 'Stealth Grey', price: 0, imageUrl: 'https://images.unsplash.com/photo-1620592983574-e866a2cb89d3?q=80&w=2071' },
                { name: 'Pearl White Multi-Coat', price: 1000, imageUrl: 'https://images.unsplash.com/photo-1620592983574-e866a2cb89d3?q=80&w=2071' },
                { name: 'Deep Blue Metallic', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1620592983574-e866a2cb89d3?q=80&w=2071' },
                { name: 'Solid Black', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1561580119-e93297a7cc21?q=80&w=2070' },
                { name: 'Ultra Red', price: 2500, imageUrl: 'https://images.unsplash.com/photo-1620592983574-e866a2cb89d3?q=80&w=2071' }
            ]
        },
        {
            name: 'Model X Plaid',
            slug: 'model-x-plaid',
            base_price: 94990,
            description: 'The highest performing SUV ever built. 1,020 hp.',
            range: 326,
            top_speed: 163,
            category: 'SUV',
            drive_train: 'Tri-Motor AWD',
            acceleration: 2.5,
            variants: [
                { name: 'Plaid', price: 0 }
            ],
            colors: [
                { name: 'Signature Red', price: 0, imageUrl: 'https://images.unsplash.com/photo-1561580119-e93297a7cc21?q=80&w=2070' },
                { name: 'Solid Black', price: 0, imageUrl: 'https://images.unsplash.com/photo-1561580119-e93297a7cc21?q=80&w=2070' }
            ]
        },
        {
            name: 'Model Y',
            slug: 'model-y',
            base_price: 43990,
            description: 'Model Y is a fully electric, mid-size SUV with unparalleled protection and versatile cargo space.',
            range: 260,
            top_speed: 135,
            category: 'SUV',
            drive_train: 'RWD',
            acceleration: 6.6,
            variants: [
                { name: 'Rear-Wheel Drive', price: 0 },
                { name: 'Long Range AWD', price: 5000 }
            ],
            colors: [
                { name: 'Stealth Grey', price: 0, imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2070' },
                { name: 'Pearl White Multi-Coat', price: 1000, imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2070' },
                { name: 'Deep Blue Metallic', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2070' },
                { name: 'Solid Black', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2070' },
                { name: 'Quicksilver', price: 2000, imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2070' },
                { name: 'Ultra Red', price: 2000, imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2070' }
            ]
        },
        {
            name: 'Model Y Performance',
            slug: 'model-y-performance',
            base_price: 52490,
            description: 'A performance SUV with track mode and increased top speed.',
            range: 285,
            top_speed: 155,
            category: 'SUV',
            drive_train: 'Dual Motor AWD',
            acceleration: 3.5,
            variants: [
                { name: 'Performance', price: 0 }
            ],
            colors: [
                { name: 'Quicksilver', price: 2000, imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2070' },
                { name: 'Ultra Red', price: 2000, imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2070' }
            ]
        },
        {
            name: 'Cybertruck',
            slug: 'cybertruck',
            base_price: 60990,
            description: 'Built for any planet. Durable and rugged enough to go anywhere.',
            range: 250,
            top_speed: 112,
            category: 'Truck',
            drive_train: 'RWD',
            acceleration: 6.5,
            variants: [
                { name: 'Rear-Wheel Drive', price: 0 },
                { name: 'All-Wheel Drive', price: 19000 },
                { name: 'Cyberbeast', price: 39000 }
            ],
            colors: [
                { name: 'Stainless Steel', price: 0, imageUrl: 'https://images.unsplash.com/photo-1611175694989-4870edaa4da7?q=80&w=2070' }
            ]
        },
        {
            name: 'Cyberbeast',
            slug: 'cyberbeast',
            base_price: 99990,
            description: 'The ultimate truck. 0-60 in 2.6s. Towing capacity 11,000 lbs.',
            range: 320,
            top_speed: 130,
            category: 'Truck',
            drive_train: 'Tri-Motor AWD',
            acceleration: 2.6,
            variants: [
                { name: 'Cyberbeast', price: 0 }
            ],
            colors: [
                { name: 'Stainless Steel', price: 0, imageUrl: 'https://images.unsplash.com/photo-1611175694989-4870edaa4da7?q=80&w=2070' }
            ]
        },
        {
            name: 'Roadster',
            slug: 'roadster',
            base_price: 200000,
            description: 'The quickest car in the world, with record-setting acceleration, range and performance.',
            range: 620,
            top_speed: 250,
            category: 'Sports',
            drive_train: 'AWD',
            acceleration: 1.9,
            variants: [
                { name: 'Base Reservation', price: 0 },
                { name: 'Founders Series', price: 50000 }
            ],
            colors: [
                { name: 'Signature Red', price: 0, imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070' },
                { name: 'Matte Black', price: 10000, imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070' }
            ]
        },
        {
            name: 'Tesla Semi',
            slug: 'semi',
            base_price: 150000,
            description: 'The safest, most comfortable truck ever. 500 mile range highway drive.',
            range: 500,
            top_speed: 65,
            category: 'Truck',
            drive_train: 'Tri-Motor',
            acceleration: 20.0,
            variants: [
                { name: '300 Mile Range', price: 0 },
                { name: '500 Mile Range', price: 30000 }
            ],
            colors: [
                { name: 'Silver', price: 0, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad42243c59?q=80&w=2070' },
                { name: 'White', price: 0, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad42243c59?q=80&w=2070' }
            ]
        },
        {
            name: 'Cyberquad',
            slug: 'cyberquad',
            base_price: 1900,
            description: 'All-electric ATV for kids. Inspired by our iconic Cybertruck design.',
            range: 15,
            top_speed: 10,
            category: 'ATV',
            drive_train: 'Electric',
            acceleration: 4.0,
            variants: [
                { name: 'Standard', price: 0 }
            ],
            colors: [
                { name: 'Stainless Steel', price: 0, imageUrl: 'https://images.unsplash.com/photo-1611175694989-4870edaa4da7?q=80&w=2070' }
            ]
        }
    ];

    for (const carData of cars) {
        const { variants, colors, ...data } = carData;
        const car = await prisma.car.create({
            data: {
                ...data,
                variants: {
                    create: variants
                },
                colors: {
                    create: colors
                }
            }
        });
        console.log(`Created car: ${car.name}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
