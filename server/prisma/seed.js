import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

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

    console.log('✅ Created Admin:', admin.email, '/ admin123');

    // 2. Create Regular Test User
    const userPassword = await bcrypt.hash('user123', 10);
    const testUser = await prisma.user.upsert({
        where: { email: 'user@test.com' },
        update: {},
        create: {
            email: 'user@test.com',
            name: 'Test User',
            password: userPassword,
            role: 'USER',
        },
    });

    console.log('✅ Created Test User:', testUser.email, '/ user123');

    // 3. Clear existing cars
    await prisma.carColor.deleteMany();
    await prisma.carVariant.deleteMany();
    await prisma.car.deleteMany();

    console.log('🗑️  Cleared existing car data');

    // 4. Create Cars with Authentic Tesla Data
    const cars = [
        {
            name: 'Model S',
            slug: 'model-s',
            base_price: 74990,
            description: 'Model S is built for speed and range, with beyond ludicrous acceleration, uncompromised aesthetics and unexpected utility.',
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
                { name: 'Pearl White Multi-Coat', price: 0, imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-Main-Hero-Desktop-LHD.png' },
                { name: 'Solid Black', price: 1500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT336,$PPSB,$W41B,$IBB0&view=STUD_3QTR&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Midnight Silver Metallic', price: 1500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT337,$PMNG,$W41B,$IBB0&view=STUD_3QTR&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Deep Blue Metallic', price: 1500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT338,$PPSB,$W41B,$IBB0&view=STUD_3QTR&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Ultra Red', price: 2500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT340,$PPSB,$W41B,$IBB0&view=STUD_3QTR&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&' }
            ]
        },
        {
            name: 'Model 3',
            slug: 'model-3',
            base_price: 38990,
            description: 'Model 3 is designed for electric-powered performance, with quick acceleration, long range and fast charging.',
            range: 272,
            top_speed: 125,
            category: 'Sedan',
            drive_train: 'RWD',
            acceleration: 5.8,
            variants: [
                { name: 'Rear-Wheel Drive', price: 0 },
                { name: 'Long Range AWD', price: 8000 },
                { name: 'Performance', price: 11000 }
            ],
            colors: [
                { name: 'Pearl White Multi-Coat', price: 0, imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Main-Hero-Desktop-LHD.png' },
                { name: 'Solid Black', price: 1500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT336,$PPSB,$W32B,$IBE00&view=STUD_3QTR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Midnight Silver Metallic', price: 1500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT337,$PMNG,$W32B,$IBE00&view=STUD_3QTR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Deep Blue Metallic', price: 1500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT338,$PPSB,$W32B,$IBE00&view=STUD_3QTR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Ultra Red', price: 2000, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT340,$PPSB,$W32B,$IBE00&view=STUD_3QTR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Stealth Grey', price: 2000, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT341,$PPSW,$W32B,$IBE00&view=STUD_3QTR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&' }
            ]
        },
        {
            name: 'Model X',
            slug: 'model-x',
            base_price: 79990,
            description: 'Model X offers versatile seating and an efficient, refined cabin for any journey.',
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
                { name: 'Pearl White Multi-Coat', price: 0, imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-X-Main-Hero-Desktop-LHD.png' },
                { name: 'Solid Black', price: 1500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT336,$PPSB,$W41B,$IBE00&view=STUD_3QTR&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Midnight Silver Metallic', price: 1500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT337,$PMNG,$W41B,$IBE00&view=STUD_3QTR&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Deep Blue Metallic', price: 1500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT338,$PPSB,$W41B,$IBE00&view=STUD_3QTR&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Ultra Red', price: 2500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT340,$PPSB,$W41B,$IBE00&view=STUD_3QTR&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&' }
            ]
        },
        {
            name: 'Model Y',
            slug: 'model-y',
            base_price: 43990,
            description: 'Model Y is a fully electric mid-size SUV with unparalleled protection and versatile cargo space.',
            range: 260,
            top_speed: 135,
            category: 'SUV',
            drive_train: 'RWD',
            acceleration: 6.6,
            variants: [
                { name: 'Rear-Wheel Drive', price: 0 },
                { name: 'Long Range AWD', price: 5000 },
                { name: 'Performance', price: 8500 }
            ],
            colors: [
                { name: 'Pearl White Multi-Coat', price: 0, imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Main-Hero-Desktop-Global.png' },
                { name: 'Solid Black', price: 1500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT336,$PPSB,$W40B,$IBE00&view=STUD_3QTR&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Midnight Silver Metallic', price: 1500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT337,$PMNG,$W40B,$IBE00&view=STUD_3QTR&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Deep Blue Metallic', price: 1500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT338,$PPSB,$W40B,$IBE00&view=STUD_3QTR&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Ultra Red', price: 2000, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT340,$PPSB,$W40B,$IBE00&view=STUD_3QTR&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Quicksilver', price: 2000, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT342,$PPSB,$W40B,$IBE00&view=STUD_3QTR&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&' }
            ]
        },
        {
            name: 'Cybertruck',
            slug: 'cybertruck',
            base_price: 60990,
            description: 'Built for any planet. Durable, rugged and versatile enough to tackle any terrain.',
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
                { name: 'Stainless Steel', price: 0, imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Main-Hero-Desktop-NA.png' }
            ]
        },
        {
            name: 'Roadster',
            slug: 'roadster',
            base_price: 200000,
            description: 'An all-electric supercar. 0-60 mph in 1.9s. 250+ mph top speed. 620 mile range.',
            range: 620,
            top_speed: 250,
            category: 'Sports',
            drive_train: 'Tri-Motor AWD',
            acceleration: 1.9,
            variants: [
                { name: 'Base Reservation', price: 0 },
                { name: 'Founders Series', price: 50000 }
            ],
            colors: [
                { name: 'Signature Red', price: 0, imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Roadster-Desktop.png' },
                { name: 'Midnight Black', price: 5000, imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Roadster-Desktop.png' },
                { name: 'Ceramic White', price: 5000, imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Roadster-Desktop.png' }
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
        console.log(`✅ Created car: ${car.name} with ${variants.length} variants and ${colors.length} colors`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log(`📊 Total cars: ${cars.length}`);
    console.log('👤 Admin: admin@tesla.com / admin123');
    console.log('👤 User: user@test.com / user123');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
