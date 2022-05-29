import { instanceMockAdapter } from '../helpers/requestUtil';


const mockRes: any[] =
  [{ "province": "تهران", "membersCount": 11056234, "totalNonVaccinesCount": 309034, "doses": { "1": 10747200, "2": 10046153, "3": 5204492, "4": 7276, "5": 40858, "6": 1 }, "gtDoses": { "0": 26045980, "1": 15298780, "2": 5252627, "3": 48135, "4": 40859, "5": 1, "6": 0 }, "dosesToMembersCountPercentage": { "1": 97.2048, "2": 90.8641, "3": 47.0729, "4": 0.0658, "5": 0.3695, "6": 0.0 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 58.7375, "2": 20.1667, "3": 0.1848, "4": 0.1568, "5": 0.0, "6": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 2.7951 }, { "province": "خراسان رضوی", "membersCount": 4929211, "totalNonVaccinesCount": 84346, "doses": { "1": 4844865, "2": 4434592, "3": 1835643, "4": 3021, "5": 17213 }, "gtDoses": { "0": 11135334, "1": 6290469, "2": 1855877, "3": 20234, "4": 17213, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.2888, "2": 89.9655, "3": 37.24, "4": 0.0612, "5": 0.3492 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 56.491, "2": 16.6665, "3": 0.1817, "4": 0.1545, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.7111 }, { "province": "اصفهان", "membersCount": 4006167, "totalNonVaccinesCount": 53706, "doses": { "1": 3952461, "2": 3633183, "3": 1590121, "4": 36, "5": 4140 }, "gtDoses": { "0": 9179941, "1": 5227480, "2": 1594297, "3": 4176, "4": 4140, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.6594, "2": 90.6897, "3": 39.6918, "4": 8.0E-4, "5": 0.1033 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 56.9445, "2": 17.3671, "3": 0.0454, "4": 0.045, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.3405 }, { "province": "فارس", "membersCount": 3796573, "totalNonVaccinesCount": 55160, "doses": { "1": 3741413, "2": 3507152, "3": 1714875, "4": 12, "5": 5342 }, "gtDoses": { "0": 8968794, "1": 5227381, "2": 1720229, "3": 5354, "4": 5342, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.5471, "2": 92.3767, "3": 45.169, "4": 3.0E-4, "5": 0.1407 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 58.2841, "2": 19.1801, "3": 0.0596, "4": 0.0595, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.4528 }, { "province": "خوزستان", "membersCount": 3227420, "totalNonVaccinesCount": 68471, "doses": { "1": 3158949, "2": 2759894, "3": 1082981, "4": 184, "5": 3782 }, "gtDoses": { "0": 7005790, "1": 3846841, "2": 1086947, "3": 3966, "4": 3782, "5": 0 }, "dosesToMembersCountPercentage": { "1": 97.8784, "2": 85.5139, "3": 33.5556, "4": 0.0057, "5": 0.1171 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 54.9094, "2": 15.5149, "3": 0.0566, "4": 0.0539, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 2.1215 }, { "province": "آذربایجان شرقی", "membersCount": 3053214, "totalNonVaccinesCount": 39701, "doses": { "1": 3013513, "2": 2844062, "3": 1555519, "4": 12, "5": 3852 }, "gtDoses": { "0": 7416958, "1": 4403445, "2": 1559383, "3": 3864, "4": 3852, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.6996, "2": 93.1497, "3": 50.9469, "4": 3.0E-4, "5": 0.1261 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 59.3699, "2": 21.0245, "3": 0.052, "4": 0.0519, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.3003 }, { "province": "مازندران", "membersCount": 2666084, "totalNonVaccinesCount": 6630, "doses": { "1": 2659454, "2": 2520542, "3": 1415619, "4": 4061, "5": 55980 }, "gtDoses": { "0": 6655656, "1": 3996202, "2": 1475660, "3": 60041, "4": 55980, "5": 0 }, "dosesToMembersCountPercentage": { "1": 99.7513, "2": 94.5409, "3": 53.0973, "4": 0.1523, "5": 2.0997 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 60.0421, "2": 22.1715, "3": 0.9021, "4": 0.841, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 0.2486 }, { "province": "آذربایجان غربی", "membersCount": 2458298, "totalNonVaccinesCount": 22456, "doses": { "1": 2435842, "2": 2252190, "3": 1016576, "4": 7, "5": 1951 }, "gtDoses": { "0": 5706566, "1": 3270724, "2": 1018534, "3": 1958, "4": 1951, "5": 0 }, "dosesToMembersCountPercentage": { "1": 99.0865, "2": 91.6158, "3": 41.3528, "4": 2.0E-4, "5": 0.0793 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 57.315, "2": 17.8484, "3": 0.0343, "4": 0.0341, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 0.9134 }, { "province": "کرمان", "membersCount": 2178425, "totalNonVaccinesCount": 24902, "doses": { "1": 2153523, "2": 1970020, "3": 834047, "4": 7, "5": 1857 }, "gtDoses": { "0": 4959454, "1": 2805931, "2": 835911, "3": 1864, "4": 1857, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.8568, "2": 90.4332, "3": 38.2866, "4": 3.0E-4, "5": 0.0852 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 56.5774, "2": 16.8549, "3": 0.0375, "4": 0.0374, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.1431 }, { "province": "گیلان", "membersCount": 2155787, "totalNonVaccinesCount": 35131, "doses": { "1": 2120656, "2": 2023027, "3": 1066848, "4": 31, "5": 4535 }, "gtDoses": { "0": 5215097, "1": 3094441, "2": 1071414, "3": 4566, "4": 4535, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.3703, "2": 93.8416, "3": 49.4876, "4": 0.0014, "5": 0.2103 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 59.3362, "2": 20.5444, "3": 0.0875, "4": 0.0869, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.6296 }, { "province": "البرز", "membersCount": 2136373, "totalNonVaccinesCount": 53649, "doses": { "1": 2082724, "2": 1940475, "3": 926851, "4": 113, "5": 4390 }, "gtDoses": { "0": 4954553, "1": 2871829, "2": 931354, "3": 4503, "4": 4390, "5": 0 }, "dosesToMembersCountPercentage": { "1": 97.4887, "2": 90.8303, "3": 43.3843, "4": 0.0052, "5": 0.2054 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 57.9634, "2": 18.7979, "3": 0.0908, "4": 0.0886, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 2.5112 }, { "province": "سیستان و بلوچستان", "membersCount": 1817272, "totalNonVaccinesCount": 38815, "doses": { "1": 1778457, "2": 1537490, "3": 667553, "4": 17, "5": 2282 }, "gtDoses": { "0": 3985799, "1": 2207342, "2": 669852, "3": 2299, "4": 2282, "5": 0 }, "dosesToMembersCountPercentage": { "1": 97.8641, "2": 84.6042, "3": 36.7337, "4": 9.0E-4, "5": 0.1255 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 55.3801, "2": 16.8059, "3": 0.0576, "4": 0.0572, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 2.1358 }, { "province": "کرمانشاه", "membersCount": 1427633, "totalNonVaccinesCount": 12263, "doses": { "1": 1415370, "2": 1304111, "3": 638775, "4": 5, "5": 1985 }, "gtDoses": { "0": 3360246, "1": 1944876, "2": 640765, "3": 1990, "4": 1985, "5": 0 }, "dosesToMembersCountPercentage": { "1": 99.141, "2": 91.3477, "3": 44.7436, "4": 3.0E-4, "5": 0.139 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 57.8789, "2": 19.0689, "3": 0.0592, "4": 0.059, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 0.8589 }, { "province": "هرمزگان", "membersCount": 1401531, "totalNonVaccinesCount": 33723, "doses": { "1": 1367808, "2": 1260477, "3": 631184, "4": 15, "5": 2382 }, "gtDoses": { "0": 3261866, "1": 1894058, "2": 633581, "3": 2397, "4": 2382, "5": 0 }, "dosesToMembersCountPercentage": { "1": 97.5938, "2": 89.9357, "3": 45.0353, "4": 0.001, "5": 0.1699 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 58.0667, "2": 19.4238, "3": 0.0734, "4": 0.073, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 2.4061 }, { "province": "گلستان", "membersCount": 1316489, "totalNonVaccinesCount": 1540, "doses": { "1": 1314949, "2": 1195480, "3": 495820, "4": 311, "5": 6420, "6": 8 }, "gtDoses": { "0": 3012988, "1": 1698039, "2": 502559, "3": 6739, "4": 6428, "5": 8, "6": 0 }, "dosesToMembersCountPercentage": { "1": 99.883, "2": 90.8081, "3": 37.6622, "4": 0.0236, "5": 0.4876, "6": 6.0E-4 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 56.3573, "2": 16.6797, "3": 0.2236, "4": 0.2133, "5": 2.0E-4, "6": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 0.1169 }, { "province": "همدان", "membersCount": 1295384, "totalNonVaccinesCount": 19387, "doses": { "1": 1275997, "2": 1180135, "3": 553708, "4": 4, "5": 1186 }, "gtDoses": { "0": 3011030, "1": 1735033, "2": 554898, "3": 1190, "4": 1186, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.5033, "2": 91.1031, "3": 42.7446, "4": 3.0E-4, "5": 0.0915 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 57.6225, "2": 18.4288, "3": 0.0395, "4": 0.0393, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.4966 }, { "province": "لرستان", "membersCount": 1255740, "totalNonVaccinesCount": 32047, "doses": { "1": 1223693, "2": 1110077, "3": 496081, "4": 12, "5": 1048 }, "gtDoses": { "0": 2830911, "1": 1607218, "2": 497141, "3": 1060, "4": 1048, "5": 0 }, "dosesToMembersCountPercentage": { "1": 97.4479, "2": 88.4002, "3": 39.505, "4": 9.0E-4, "5": 0.0834 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 56.7738, "2": 17.5611, "3": 0.0374, "4": 0.037, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 2.552 }, { "province": "مرکزی", "membersCount": 1128558, "totalNonVaccinesCount": 15495, "doses": { "1": 1113063, "2": 1043861, "3": 519687, "4": 27, "5": 1390 }, "gtDoses": { "0": 2678028, "1": 1564965, "2": 521104, "3": 1417, "4": 1390, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.627, "2": 92.4951, "3": 46.0487, "4": 0.0023, "5": 0.1231 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 58.4372, "2": 19.4584, "3": 0.0529, "4": 0.0519, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.3729 }, { "province": "کردستان", "membersCount": 1087892, "totalNonVaccinesCount": 17854, "doses": { "1": 1070038, "2": 963172, "3": 380171, "4": 5, "5": 645 }, "gtDoses": { "0": 2414031, "1": 1343993, "2": 380821, "3": 650, "4": 645, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.3588, "2": 88.5356, "3": 34.9456, "4": 4.0E-4, "5": 0.0592 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 55.6742, "2": 15.7753, "3": 0.0269, "4": 0.0267, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.6411 }, { "province": "قزوین", "membersCount": 999128, "totalNonVaccinesCount": 10585, "doses": { "1": 988543, "2": 912142, "3": 421499, "4": 13, "5": 534 }, "gtDoses": { "0": 2322731, "1": 1334188, "2": 422046, "3": 547, "4": 534, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.9405, "2": 91.2938, "3": 42.1866, "4": 0.0013, "5": 0.0534 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 57.4404, "2": 18.1702, "3": 0.0235, "4": 0.0229, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.0594 }, { "province": "اردبيل", "membersCount": 948244, "totalNonVaccinesCount": 15979, "doses": { "1": 932265, "2": 867419, "3": 418157, "4": 4, "5": 847 }, "gtDoses": { "0": 2218692, "1": 1286427, "2": 419008, "3": 851, "4": 847, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.3148, "2": 91.4763, "3": 44.098, "4": 4.0E-4, "5": 0.0893 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 57.9813, "2": 18.8853, "3": 0.0383, "4": 0.0381, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.6851 }, { "province": "یزد", "membersCount": 905323, "totalNonVaccinesCount": 16998, "doses": { "1": 888325, "2": 809858, "3": 338524, "4": 4, "5": 1212 }, "gtDoses": { "0": 2037923, "1": 1149598, "2": 339740, "3": 1216, "4": 1212, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.1224, "2": 89.4551, "3": 37.3926, "4": 4.0E-4, "5": 0.1338 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 56.4102, "2": 16.6708, "3": 0.0596, "4": 0.0594, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.8775 }, { "province": "قم", "membersCount": 827847, "totalNonVaccinesCount": 18415, "doses": { "1": 809432, "2": 716279, "3": 257320, "4": 14, "5": 810 }, "gtDoses": { "0": 1783855, "1": 974423, "2": 258144, "3": 824, "4": 810, "5": 0 }, "dosesToMembersCountPercentage": { "1": 97.7755, "2": 86.5231, "3": 31.083, "4": 0.0016, "5": 0.0978 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 54.6245, "2": 14.4711, "3": 0.0461, "4": 0.0454, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 2.2244 }, { "province": "زنجان", "membersCount": 817287, "totalNonVaccinesCount": 10738, "doses": { "1": 806549, "2": 759253, "3": 407371, "4": 6, "5": 1150 }, "gtDoses": { "0": 1974329, "1": 1167780, "2": 408527, "3": 1156, "4": 1150, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.6861, "2": 92.8991, "3": 49.8442, "4": 7.0E-4, "5": 0.1407 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 59.1481, "2": 20.6919, "3": 0.0585, "4": 0.0582, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.3138 }, { "province": "بوشهر", "membersCount": 807053, "totalNonVaccinesCount": 9776, "doses": { "1": 797277, "2": 730852, "3": 297019, "4": 7, "5": 365 }, "gtDoses": { "0": 1825520, "1": 1028243, "2": 297391, "3": 372, "4": 365, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.7886, "2": 90.5581, "3": 36.8029, "4": 8.0E-4, "5": 0.0452 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 56.326, "2": 16.2907, "3": 0.0203, "4": 0.0199, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.2113 }, { "province": "چهارمحال و بختیاری", "membersCount": 671624, "totalNonVaccinesCount": 4826, "doses": { "1": 666798, "2": 626619, "3": 307450, "4": 3, "5": 1166 }, "gtDoses": { "0": 1602036, "1": 935238, "2": 308619, "3": 1169, "4": 1166, "5": 0 }, "dosesToMembersCountPercentage": { "1": 99.2814, "2": 93.299, "3": 45.777, "4": 4.0E-4, "5": 0.1736 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 58.378, "2": 19.2641, "3": 0.0729, "4": 0.0727, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 0.7185 }, { "province": "خراسان شمالی", "membersCount": 648525, "totalNonVaccinesCount": 5978, "doses": { "1": 642547, "2": 597049, "3": 277082, "4": 6, "5": 554 }, "gtDoses": { "0": 1517238, "1": 874691, "2": 277642, "3": 560, "4": 554, "5": 0 }, "dosesToMembersCountPercentage": { "1": 99.0782, "2": 92.0626, "3": 42.7249, "4": 9.0E-4, "5": 0.0854 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 57.6502, "2": 18.2991, "3": 0.0369, "4": 0.0365, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 0.9217 }, { "province": "خراسان جنوبی", "membersCount": 556917, "totalNonVaccinesCount": 6310, "doses": { "1": 550607, "2": 508140, "3": 203678, "4": 11, "5": 331 }, "gtDoses": { "0": 1262767, "1": 712160, "2": 204020, "3": 342, "4": 331, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.8669, "2": 91.2416, "3": 36.5724, "4": 0.0019, "5": 0.0594 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 56.3967, "2": 16.1565, "3": 0.027, "4": 0.0262, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.133 }, { "province": "سمنان", "membersCount": 548882, "totalNonVaccinesCount": 6692, "doses": { "1": 542190, "2": 511062, "3": 271388, "4": 9, "5": 1057 }, "gtDoses": { "0": 1325706, "1": 783516, "2": 272454, "3": 1066, "4": 1057, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.7807, "2": 93.1096, "3": 49.4437, "4": 0.0016, "5": 0.1925 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 59.1017, "2": 20.5516, "3": 0.0804, "4": 0.0797, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.2192 }, { "province": "کهگیلویه و بویراحمد", "membersCount": 524238, "totalNonVaccinesCount": 7474, "doses": { "1": 516764, "2": 478139, "3": 220209, "5": 555 }, "gtDoses": { "0": 1215667, "1": 698903, "2": 220764, "3": 555, "5": 0 }, "dosesToMembersCountPercentage": { "1": 98.5743, "2": 91.2064, "3": 42.0055, "5": 0.1058 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 57.4913, "2": 18.1599, "3": 0.0456, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 1.4256 }, { "province": "ایلام", "membersCount": 416477, "totalNonVaccinesCount": 9053, "doses": { "1": 407424, "2": 376021, "3": 156267, "5": 150 }, "gtDoses": { "0": 939862, "1": 532438, "2": 156417, "3": 150, "5": 0 }, "dosesToMembersCountPercentage": { "1": 97.8262, "2": 90.2861, "3": 37.5211, "5": 0.036 }, "gtDosesToTotalDosesPercentage": { "0": 100.0, "1": 56.6506, "2": 16.6425, "3": 0.0159, "5": 0.0 }, "totalNonVaccinesCountToMembersCountPercentage": 2.1737 }]



instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/general/g, {})
  .reply(() => {
    const res: any = {
      numberOfTotalBakery: 3314,
      numberOfEnableBakery: 0,
      numberOfDisableBakery: 2444302,
      numberOfAudit: 137517,
      numberOfSamt: 19342,
      numberOfSima: 19342,
      numberOfActivePos: 19342,
      numberOfAvgSupplyFlour: 19342,
    };
    return [200, { ...res }];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/per\-category/g, {})
  .reply(() => {
    const res: any[] = [
      {
        "_id": "62921ccfd74c22432993672b",
        "index": 0,
        "total": 700,
        "samt": 41,
        "sima": 93,
        "categoryValue": "لواش"
      },
      {
        "_id": "62921ccff52cfb30e54a70ee",
        "index": 1,
        "total": 3353,
        "samt": 75,
        "sima": 21,
        "categoryValue": "سنگک"
      },
      {
        "_id": "62921ccfe339570bde428a76",
        "index": 2,
        "total": 547,
        "samt": 79,
        "sima": 27,
        "categoryValue": "نان روغنی"
      },
      {
        "_id": "62921ccf1f1946134ecdf99d",
        "index": 3,
        "total": 1279,
        "samt": 28,
        "sima": 24,
        "categoryValue": "شیرینی پزی و قنادی"
      },
      {
        "_id": "62921ccf92a7d6304b6a075b",
        "index": 4,
        "total": 1018,
        "samt": 83,
        "sima": 86,
        "categoryValue": "تافتون"
      }
    ];

    return [200, [...res]];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/license/g, {})
  .reply(() => {

    return [200, [...mockRes]];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/active\-time/g, {})
  .reply(() => {

    return [200, [...mockRes]];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/sell\-rate/g, {})
  .reply(() => {

    return [200, [...mockRes]];
  });

instanceMockAdapter
  // eslint-disable-next-line
  .onGet(/\/api\/v1\/bakery\/sold\-count/g, {})
  .reply(() => {
    return [200, [...mockRes]];
  });