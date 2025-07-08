const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제 (개발환경에서만)
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // 컴퓨터 용품 카테고리 생성
  const categories = await prisma.category.createMany({
    data: [
      { id: 1, name: '마우스' },
      { id: 2, name: '키보드' },
      { id: 3, name: '헤드셋/이어폰' },
      { id: 4, name: '마우스패드' },
      { id: 5, name: '모니터' },
      { id: 6, name: '웹캠' },
      { id: 7, name: '스피커' },
      { id: 8, name: '케이블/어댑터' }
    ]
  });

  // 사용자 생성 (게이머, 개발자, 디자이너 등)
  const hashedPassword = await bcrypt.hash('password123', 10);
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'gamer@example.com',
        password: hashedPassword,
        name: '김게이머',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        email: 'developer@example.com',
        password: hashedPassword,
        name: '박개발자',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        email: 'designer@example.com',
        password: hashedPassword,
        name: '이디자이너',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        email: 'streamer@example.com',
        password: hashedPassword,
        name: '최스트리머',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        email: 'office@example.com',
        password: hashedPassword,
        name: '정직장인',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    ]
  });

  // 주소 생성
  await prisma.address.createMany({
    data: [
      {
        userId: 1,
        recipientName: '김게이머',
        phone: '010-1111-2222',
        postalCode: '06292',
        address1: '서울특별시 강남구 테헤란로',
        address2: '123-45 게이밍센터 501호',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        userId: 2,
        recipientName: '박개발자',
        phone: '010-3333-4444',
        postalCode: '13529',
        address1: '경기도 성남시 분당구 정자일로',
        address2: '678-90 IT타워 1201호',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        userId: 3,
        recipientName: '이디자이너',
        phone: '010-5555-6666',
        postalCode: '04522',
        address1: '서울특별시 중구 을지로',
        address2: '111-22 디자인스튜디오 7층',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        userId: 4,
        recipientName: '최스트리머',
        phone: '010-7777-8888',
        postalCode: '21554',
        address1: '인천광역시 남동구 논현로',
        address2: '333-44 방송스튜디오 201호',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    ]
  });

  // 컴퓨터 용품 상품 생성
  await prisma.product.createMany({
    data: [
      // 마우스
      {
        categoryId: 1,
        name: '로지텍 G Pro X Superlight',
        price: 169000,
        description: '프로게이머를 위한 초경량 무선 게이밍마우스. 무게 63g 미만으로 정밀한 조작이 가능합니다.',
        stock: 50,
        company: 'Logitech',
        isSale: true,
        image: 'logitech_g_pro_x_superlight.jpg',
        releasedAt: new Date('2023-08-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        categoryId: 1,
        name: '레이저 DeathAdder V3',
        price: 89000,
        description: '에르고노믹 디자인의 유선 게이밍 마우스. 30,000 DPI Focus Pro 센서 탑재.',
        stock: 75,
        company: 'Razer',
        isSale: true,
        image: 'razer_deathadder_v3.jpg',
        releasedAt: new Date('2023-06-20'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        categoryId: 1,
        name: 'SteelSeries Rival 650',
        price: 139000,
        description: '무게 조절 가능한 무선 게이밍 마우스. 퀀텀 무선 기술로 지연 없는 연결.',
        stock: 40,
        company: 'SteelSeries',
        isSale: true,
        image: 'steelseries_rival_650.jpg',
        releasedAt: new Date('2023-04-10'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },

      // 키보드
      {
        categoryId: 2,
        name: '로지텍 G915 TKL',
        price: 259000,
        description: '초슬림 무선 기계식 키보드. GL 스위치와 RGB 백라이트 적용.',
        stock: 35,
        company: 'Logitech',
        isSale: true,
        image: 'logitech_g915_tkl.jpg',
        releasedAt: new Date('2023-05-25'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        categoryId: 2,
        name: '체리 MX Keys',
        price: 149000,
        description: '프리미엄 무선 키보드. 백라이트와 스마트 조명 기능으로 생산성 향상.',
        stock: 60,
        company: 'Cherry',
        isSale: true,
        image: 'cherry_mx_keys.jpg',
        releasedAt: new Date('2023-03-18'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        categoryId: 2,
        name: '레이저 BlackWidow V4 Pro',
        price: 329000,
        description: '궁극의 게이밍 키보드. Green 기계식 스위치와 다기능 다이얼 탑재.',
        stock: 25,
        company: 'Razer',
        isSale: true,
        image: 'razer_blackwidow_v4_pro.jpg',
        releasedAt: new Date('2023-09-05'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },

      // 헤드셋/이어폰
      {
        categoryId: 3,
        name: 'SteelSeries Arctis 7P+',
        price: 189000,
        description: '2.4GHz 무선 게이밍 헤드셋. 30시간 배터리와 DTS 7.1 서라운드 사운드.',
        stock: 55,
        company: 'SteelSeries',
        isSale: true,
        image: 'steelseries_arctis_7p_plus.jpg',
        releasedAt: new Date('2023-07-12'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        categoryId: 3,
        name: '젠하이저 HD 660S',
        price: 599000,
        description: '오픈백 오디오파일 헤드폰. 스튜디오급 음질과 넓은 사운드스테이지.',
        stock: 20,
        company: 'Sennheiser',
        isSale: true,
        image: 'sennheiser_hd_660s.jpg',
        releasedAt: new Date('2023-02-28'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        categoryId: 3,
        name: 'HyperX Cloud Alpha',
        price: 99000,
        description: '듀얼 챔버 드라이버 게이밍 헤드셋. 뛰어난 음질과 편안한 착용감.',
        stock: 80,
        company: 'HyperX',
        isSale: true,
        image: 'hyperx_cloud_alpha.jpg',
        releasedAt: new Date('2023-01-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },

      // 마우스패드
      {
        categoryId: 4,
        name: 'SteelSeries QcK Heavy',
        price: 39000,
        description: '6mm 두께의 프리미엄 게이밍 마우스패드. 뛰어난 제어력과 내구성.',
        stock: 120,
        company: 'SteelSeries',
        isSale: true,
        image: 'steelseries_qck_heavy.jpg',
        releasedAt: new Date('2023-01-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        categoryId: 4,
        name: '로지텍 G640',
        price: 45000,
        description: '대형 클로스 게이밍 마우스패드. 일관된 표면 질감으로 정확한 센서 추적.',
        stock: 100,
        company: 'Logitech',
        isSale: true,
        image: 'logitech_g640.jpg',
        releasedAt: new Date('2023-02-14'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },

      // 모니터
      {
        categoryId: 5,
        name: 'ASUS ROG Swift PG279QM',
        price: 899000,
        description: '27인치 240Hz IPS 게이밍 모니터. G-SYNC 호환과 HDR400 지원.',
        stock: 15,
        company: 'ASUS',
        isSale: true,
        image: 'asus_rog_swift_pg279qm.jpg',
        releasedAt: new Date('2023-06-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        categoryId: 5,
        name: 'LG 27GP850-B',
        price: 449000,
        description: '27인치 165Hz Nano IPS 모니터. sRGB 98% 색 재현율과 1ms 응답속도.',
        stock: 30,
        company: 'LG',
        isSale: true,
        image: 'lg_27gp850_b.jpg',
        releasedAt: new Date('2023-04-22'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },

      // 웹캠
      {
        categoryId: 6,
        name: '로지텍 BRIO 4K',
        price: 259000,
        description: '4K Ultra HD 웹캠. HDR과 Windows Hello 얼굴 인식 지원.',
        stock: 45,
        company: 'Logitech',
        isSale: true,
        image: 'logitech_brio_4k.jpg',
        releasedAt: new Date('2023-03-08'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        categoryId: 6,
        name: '레이저 Kiyo Pro',
        price: 199000,
        description: '풀HD 60fps 스트리밍 웹캠. 적응형 광 센서와 HDR 지원.',
        stock: 35,
        company: 'Razer',
        isSale: true,
        image: 'razer_kiyo_pro.jpg',
        releasedAt: new Date('2023-05-17'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },

      // 스피커
      {
        categoryId: 7,
        name: '로지텍 G560',
        price: 229000,
        description: 'RGB 게이밍 스피커. DTS:X Ultra와 게임 오디오 시각화 기능.',
        stock: 25,
        company: 'Logitech',
        isSale: true,
        image: 'logitech_g560.jpg',
        releasedAt: new Date('2023-08-03'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },

      // 케이블/어댑터
      {
        categoryId: 8,
        name: 'UGREEN USB-C 허브',
        price: 59000,
        description: '7-in-1 USB-C 멀티포트 허브. 4K HDMI, USB 3.0, PD 충전 지원.',
        stock: 85,
        company: 'UGREEN',
        isSale: true,
        image: 'ugreen_usb_c_hub.jpg',
        releasedAt: new Date('2023-01-20'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        categoryId: 8,
        name: 'Anker PowerLine III USB-C',
        price: 25000,
        description: '고속 충전 USB-C 케이블. 25,000회 구부림 테스트 통과한 내구성.',
        stock: 150,
        company: 'Anker',
        isSale: true,
        image: 'anker_powerline_iii_usbc.jpg',
        releasedAt: new Date('2023-02-05'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    ]
  });

  // 장바구니 생성
  await prisma.cart.createMany({
    data: [
      {
        id: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  });

  // 장바구니 아이템 생성
  await prisma.cartItem.createMany({
    data: [
      // 게이머의 장바구니
      {
        cartId: 1,
        userId: 1,
        productId: 1, // 로지텍 G Pro X Superlight
        categoryId: 1,
        quantity: 1,
        price: 169000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cartId: 1,
        userId: 1,
        productId: 6, // 레이저 BlackWidow V4 Pro
        categoryId: 2,
        quantity: 1,
        price: 329000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cartId: 1,
        userId: 1,
        productId: 10, // SteelSeries QcK Heavy
        categoryId: 4,
        quantity: 1,
        price: 39000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 개발자의 장바구니
      {
        cartId: 2,
        userId: 2,
        productId: 5, // 체리 MX Keys
        categoryId: 2,
        quantity: 1,
        price: 149000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cartId: 2,
        userId: 2,
        productId: 13, // LG 27GP850-B
        categoryId: 5,
        quantity: 1,
        price: 449000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 디자이너의 장바구니
      {
        cartId: 3,
        userId: 3,
        productId: 8, // 젠하이저 HD 660S
        categoryId: 3,
        quantity: 1,
        price: 599000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  });

  // 주문 생성
  await prisma.order.createMany({
    data: [
      {
        id: 1,
        userId: 1,
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7일 전
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5일 전
        deletedAt: null
      },
      {
        id: 2,
        userId: 2,
        status: 'PROCESSING',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3일 전
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1일 전
        deletedAt: null
      },
      {
        id: 3,
        userId: 4,
        status: 'PENDING',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1일 전
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: 4,
        userId: 5,
        status: 'CANCELLED',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10일 전
        updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8일 전
        deletedAt: null
      }
    ]
  });

  // 주문 상품 생성
  await prisma.orderProduct.createMany({
    data: [
      {
        userId: 1,
        orderId: 1,
        productId: 2, // 레이저 DeathAdder V3
        categoryId: 1,
        quantity: 1,
        shippingStatus: 'DELIVERED',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        deletedAt: null
      },
      {
        userId: 1,
        orderId: 1,
        productId: 7, // SteelSeries Arctis 7P+
        categoryId: 3,
        quantity: 1,
        shippingStatus: 'DELIVERED',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        deletedAt: null
      },
      {
        userId: 2,
        orderId: 2,
        productId: 4, // 로지텍 G915 TKL
        categoryId: 2,
        quantity: 1,
        shippingStatus: 'SHIPPED',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        deletedAt: null
      },
      {
        userId: 4,
        orderId: 3,
        productId: 14, // 로지텍 BRIO 4K
        categoryId: 6,
        quantity: 1,
        shippingStatus: 'PENDING',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        userId: 5,
        orderId: 4,
        productId: 12, // ASUS ROG Swift PG279QM
        categoryId: 5,
        quantity: 1,
        shippingStatus: 'PENDING',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        deletedAt: null
      }
    ]
  });

  // 리뷰 생성
  await prisma.review.createMany({
    data: [
      {
        userId: 1,
        productId: 2,
        categoryId: 1,
        rating: 5,
        content: 'FPS 게임하기에 정말 완벽한 마우스입니다. 그립감이 좋고 센서 정확도도 뛰어나요. 적극 추천합니다!',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        deletedAt: null
      },
      {
        userId: 1,
        productId: 7,
        categoryId: 3,
        rating: 4,
        content: '음질이 정말 좋고 착용감도 편안합니다. 배터리 수명도 만족스러워요. 다만 가격이 조금 비싸긴 해요.',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        deletedAt: null
      },
      {
        userId: 2,
        productId: 5,
        categoryId: 2,
        rating: 5,
        content: '코딩할 때 타이핑 느낌이 정말 좋습니다. 백라이트도 자동으로 조절되어서 편리해요.',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        deletedAt: null
      },
      {
        userId: 3,
        productId: 8,
        categoryId: 3,
        rating: 5,
        content: '오디오 작업용으로 구매했는데 음질이 정말 뛰어납니다. 디테일한 소리까지 다 들려요.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        deletedAt: null
      },
      {
        userId: 4,
        productId: 15,
        categoryId: 6,
        rating: 4,
        content: '스트리밍 방송용으로 사용 중인데 화질이 선명하고 자동 초점도 빨라요. 조명 보정 기능이 특히 좋습니다.',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        deletedAt: null
      },
      {
        userId: 5,
        productId: 13,
        categoryId: 5,
        rating: 4,
        content: '사무용으로 구매했는데 색감이 정확하고 눈이 덜 피로합니다. 높이 조절도 편리해요.',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        deletedAt: null
      },
      {
        userId: 2,
        productId: 17,
        categoryId: 8,
        rating: 5,
        content: '노트북 확장용으로 완벽합니다. 모든 포트가 필요한 만큼 들어있고 발열도 거의 없어요.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        deletedAt: null
      },
      {
        userId: 3,
        productId: 10,
        categoryId: 4,
        rating: 5,
        content: '마우스 움직임이 정말 부드럽고 멈춤성도 좋습니다. 두께감이 있어서 손목이 편해요.',
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        deletedAt: null
      }
    ]
  });

  console.log('컴퓨터 용품 시드 데이터 생성이 완료되었습니다!');
  console.log('카테고리: 마우스, 키보드, 헤드셋/이어폰, 마우스패드, 모니터, 웹캠, 스피커, 케이블/어댑터');
  console.log('상품 수: 18개');
  console.log('사용자: 게이머, 개발자, 디자이너, 스트리머, 직장인');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });