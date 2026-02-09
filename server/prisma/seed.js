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
                { name: 'Pearl White Multi-Coat', price: 0, imageUrl: 'https://images.unsplash.com/photo-1587304878169-505d63fd6b0c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { name: 'Solid Black', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1652508996643-2fc140eebe1d?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { name: 'Midnight Silver Metallic', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1587304878428-1b533030e0e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { name: 'Deep Blue Metallic', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1652509197980-9f3d9ac7916e?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { name: 'Ultra Red', price: 2500, imageUrl: 'https://images.unsplash.com/photo-1683743408642-868e5a595487?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
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
                { name: 'Pearl White Multi-Coat', price: 0, imageUrl: 'https://images.unsplash.com/photo-1561580125-028ee3bd62eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { name: 'Solid Black', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1740170629510-c145511c59a1?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { name: 'Midnight Silver Metallic', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1740170629572-74d337e0e856?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { name: 'Deep Blue Metallic', price: 1500, imageUrl: 'https://static-assets.tesla.com/configurator/compositor?&options=$MT338,$PPSB,$W40B,$IBE00&view=STUD_3QTR&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&' },
                { name: 'Ultra Red', price: 2000, imageUrl: 'https://images.unsplash.com/photo-1741874807321-6f470a1f5fbd?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { name: 'Quicksilver', price: 2000, imageUrl: 'https://images.unsplash.com/photo-1740170512958-1474c89c82ef?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
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
                { name: 'Stainless Steel', price: 0, imageUrl: 'https://images.unsplash.com/photo-1705771801928-4fceafdd6e55?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                {
                    name: 'Satin Crimson gold',
                    price: 650,
                    imageUrl: 'https://images.unsplash.com/photo-1716304960614-67625112f271?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                },
                {
                    name: 'Iridescent Purple',
                    price: 650,
                    imageUrl: 'https://images.unsplash.com/photo-1715620036578-152bc0820b41?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                },

                {
                    name: 'Satin Dark Grey',
                    price: 650,
                    imageUrl: 'https://images.unsplash.com/photo-1727994527246-68e26082d0fd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                },

            ]
        },
        {
            name: 'Model A',
            slug: 'model-a',
            base_price: 29990,
            description: 'Compact electric hatchback designed for urban mobility and efficiency.',
            range: 280,
            top_speed: 145,
            category: 'Hatchback',
            drive_train: 'RWD',
            acceleration: 6.8,
            variants: [
                { name: 'Standard', price: 0 },
                { name: 'Long Range', price: 6000 }
            ],
            colors: [
                {
                    name: 'Urban White',
                    price: 0,
                    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop'
                },
                {
                    name: 'City Blue',
                    price: 1500,
                    imageUrl: 'https://images.unsplash.com/photo-1622219809260-ce0659a4f8f1?q=80&w=1200&auto=format&fit=crop'
                }
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
                { name: 'Signature Red', price: 0, imageUrl: 'https://images.unsplash.com/photo-1622315543232-29dd4b68af3f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { name: 'Midnight Black', price: 5000, imageUrl: 'https://plus.unsplash.com/premium_photo-1737623479045-a6a27357ffa9?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { name: 'Ceramic White', price: 5000, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { name: 'Ceramic green', price: 5000, imageUrl: 'https://plus.unsplash.com/premium_photo-1737677106508-91f7f4e1468e?q=80&w=767&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
            ]
        },
        {
            name: 'Roadster-Z',
            slug: 'roadster-z',
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
                { name: 'Signature Red', price: 0, imageUrl: 'https://images.unsplash.com/photo-1622315543232-29dd4b68af3f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { name: 'Midnight Black', price: 5000, imageUrl: 'https://plus.unsplash.com/premium_photo-1737623479045-a6a27357ffa9?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { name: 'Ceramic White', price: 5000, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { name: 'Ceramic green', price: 5000, imageUrl: 'https://plus.unsplash.com/premium_photo-1737677106508-91f7f4e1468e?q=80&w=767&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
            ]
        },
        {
            name: 'Model Z',
            slug: 'model-z',
            base_price: 89990,
            description: 'High-performance electric coupe with futuristic styling.',
            range: 380,
            top_speed: 190,
            category: 'Coupe',
            drive_train: 'AWD',
            acceleration: 3.4,
            variants: [
                { name: 'Performance', price: 0 },
                { name: 'Plaid', price: 30000 }
            ],
            colors: [
                {
                    name: 'Obsidian Black',
                    price: 0,
                    imageUrl: 'https://images.unsplash.com/photo-1575733135961-39fb82b34f86?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                },
                {
                    name: 'Crimson Red',
                    price: 2500,
                    imageUrl: 'https://images.unsplash.com/photo-1554744512-d6c603f27c54?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
            ]
        },
        {
            name: 'Model R',
            slug: 'model-r',
            base_price: 69990,
            description: 'Off-road capable electric SUV built for extreme terrain.',
            range: 300,
            top_speed: 155,
            category: 'Off-Road',
            drive_train: 'AWD',
            acceleration: 4.9,
            variants: [
                { name: 'Adventure', price: 0 },
                { name: 'Extreme', price: 15000 }
            ],
            colors: [
                {
                    name: 'Desert Sand',
                    price: 0,
                    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop'
                },
                {
                    name: 'Forest Green',
                    price: 2000,
                    imageUrl: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1200&auto=format&fit=crop'
                }
            ]
        },
        {
            name: 'Model L',
            slug: 'model-l',
            base_price: 119990,
            description: 'Ultra-luxury electric sedan focused on rear-seat comfort.',
            range: 420,
            top_speed: 170,
            category: 'Luxury Sedan',
            drive_train: 'AWD',
            acceleration: 3.9,
            variants: [
                { name: 'Executive', price: 0 },
                { name: 'Executive Plus', price: 20000 }
            ],
            colors: [
                {
                    name: 'Champagne Gold',
                    price: 0,
                    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop'
                },
                {
                    name: 'Royal Blue',
                    price: 3000,
                    imageUrl: 'https://images.unsplash.com/photo-1624969862293-b7496590c7dd?q=80&w=1200&auto=format&fit=crop'
                }
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
        console.log(` Created car: ${car.name} with ${variants.length} variants and ${colors.length} colors`);
    }

    console.log('\n Database seeded successfully!');
    console.log(` Total cars: ${cars.length}`);
    console.log(' Admin: admin@tesla.com / admin123');
    console.log(' User: user@test.com / user123');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
