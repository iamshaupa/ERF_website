(function () {
  'use strict';

  var STORAGE_KEY = 'erf-language';
  var hi = {
    'CLIMATE · BIODIVERSITY · COMMUNITY': 'जलवायु · जैव विविधता · समुदाय',
    'Home': 'मुखपृष्ठ', 'About': 'हमारे बारे में', 'About us': 'हमारे बारे में',
    'What We Do': 'हम क्या करते हैं', 'What we do': 'हम क्या करते हैं',
    'Programs': 'कार्यक्रम', 'Chapters': 'अध्याय', 'Team': 'टीम',
    'Get Involved': 'हमसे जुड़ें', 'Get involved': 'हमसे जुड़ें',
    'Explore': 'जानें', 'Partner with us': 'हमारे साथ साझेदारी करें',
    'Volunteer': 'स्वयंसेवक बनें', 'Workshops': 'कार्यशालाएँ',
    'Contact': 'संपर्क', 'Chhattisgarh, India': 'छत्तीसगढ़, भारत',
    'A grassroots environmental NGO working on climate action and biodiversity conservation across Chhattisgarh.': 'छत्तीसगढ़ में जलवायु कार्रवाई और जैव विविधता संरक्षण के लिए जमीनी स्तर पर कार्यरत पर्यावरण संस्था।',
    'Environmental NGO · Chhattisgarh': 'पर्यावरण संस्था · छत्तीसगढ़',
    'Climate action that starts in the village.': 'जलवायु कार्रवाई, जिसकी शुरुआत गाँव से होती है।',
    'Forests first.': 'वन सबसे पहले।', 'Biodiversity always.': 'जैव विविधता सदैव।',
    'Communities at the centre.': 'समुदाय केंद्र में।',
    'Earth Retreat Foundation works at the grassroots across Chhattisgarh — raising climate awareness, strengthening Biodiversity Management Committees, and helping communities protect the forests and species they live alongside.': 'अर्थ रिट्रीट फाउंडेशन छत्तीसगढ़ में जमीनी स्तर पर जलवायु जागरूकता बढ़ाता है, जैव विविधता प्रबंधन समितियों को सशक्त बनाता है और समुदायों को अपने आसपास के वनों व प्रजातियों की रक्षा में सहयोग देता है।',
    'Our programs': 'हमारे कार्यक्रम',
    'Districts engaged across Chhattisgarh — Durg, Kanker, Dhamtari, Balod, Gariyaband & Mohla': 'छत्तीसगढ़ के दुर्ग, कांकेर, धमतरी, बालोद, गरियाबंद और मोहला जिलों में सक्रिय',
    'Climate conclaves and BMC capacity-building workshops delivered in 2026': 'वर्ष 2026 में आयोजित जलवायु सम्मेलन और बीएमसी क्षमता-विकास कार्यशालाएँ',
    "Forest staff, BMC members, women's groups and villagers trained on biodiversity": 'वनकर्मियों, बीएमसी सदस्यों, महिला समूहों और ग्रामीणों को जैव विविधता प्रशिक्षण',
    'About the Foundation': 'फाउंडेशन के बारे में',
    'Informed communities build a climate-resilient future': 'जागरूक समुदाय जलवायु-सक्षम भविष्य बनाते हैं',
    'Since its inception, Earth Retreat Foundation has worked consistently towards climate change mitigation and environmental protection — running awareness programs, community capacity development, and biodiversity conservation initiatives at the grassroots level.': 'स्थापना से ही अर्थ रिट्रीट फाउंडेशन जलवायु परिवर्तन शमन और पर्यावरण संरक्षण के लिए लगातार कार्य कर रहा है—जमीनी स्तर पर जागरूकता कार्यक्रम, सामुदायिक क्षमता विकास और जैव विविधता संरक्षण पहल संचालित करते हुए।',
    "We partner with the Chhattisgarh Forest & Climate Change Department and the State Biodiversity Board as a technical partner, bringing expertise on Biodiversity Management Committees (BMCs), People's Biodiversity Registers (PBR), Access & Benefit Sharing (ABS), and eco-tourism livelihoods directly to villages.": 'तकनीकी साझेदार के रूप में हम छत्तीसगढ़ वन एवं जलवायु परिवर्तन विभाग और राज्य जैव विविधता बोर्ड के साथ कार्य करते हैं तथा बीएमसी, जन जैव विविधता रजिस्टर, एबीएस और इको-टूरिज्म आजीविका का ज्ञान सीधे गाँवों तक पहुँचाते हैं।',
    'Read our story': 'हमारी कहानी पढ़ें', 'What we focus on': 'हमारा केंद्रबिंदु',
    'Six themes, one mission': 'छह विषय, एक लक्ष्य',
    'Our work in Chhattisgarh comes together around six connected commitments — see how each one plays out on the ground.': 'छत्तीसगढ़ में हमारा कार्य छह परस्पर जुड़े संकल्पों पर आधारित है—देखिए ये जमीन पर कैसे साकार होते हैं।',
    'Climate Change': 'जलवायु परिवर्तन', 'Plastic Reduction': 'प्लास्टिक में कमी',
    'Tree Plantation': 'वृक्षारोपण', 'Biodiversity': 'जैव विविधता',
    'Capacity Building of Rural People': 'ग्रामीण समुदायों का क्षमता विकास',
    'Plastic Awareness': 'प्लास्टिक जागरूकता', 'Our objectives': 'हमारे उद्देश्य',
    'Five commitments that guide our work': 'हमारे कार्य का मार्गदर्शन करने वाले पाँच संकल्प',
    'Environmental Preservation': 'पर्यावरण संरक्षण',
    'Protecting and restoring natural ecosystems through afforestation, water conservation, soil health improvement, and sustainable resource management.': 'वनीकरण, जल संरक्षण, मृदा स्वास्थ्य सुधार और सतत संसाधन प्रबंधन से प्राकृतिक पारिस्थितिक तंत्र का संरक्षण व पुनर्स्थापन।',
    'Addressing Climate Change': 'जलवायु परिवर्तन का समाधान',
    'Raising awareness, promoting climate-resilient communities, encouraging low-carbon lifestyles, and supporting local climate action initiatives.': 'जागरूकता बढ़ाना, जलवायु-सक्षम समुदाय बनाना, कम-कार्बन जीवनशैली को प्रोत्साहित करना और स्थानीय जलवायु पहलों का समर्थन।',
    'Biodiversity Conservation': 'जैव विविधता संरक्षण',
    'Conserving native species and habitats, and encouraging community participation in safeguarding local flora and fauna.': 'स्थानीय प्रजातियों व आवासों का संरक्षण और स्थानीय वनस्पति व जीव-जंतुओं की रक्षा में सामुदायिक भागीदारी।',
    'Educating communities, schools and institutions on the harmful effects of plastic pollution through workshops, campaigns and outreach.': 'कार्यशालाओं, अभियानों और जनसंपर्क से समुदायों, स्कूलों और संस्थानों को प्लास्टिक प्रदूषण के दुष्प्रभावों के प्रति जागरूक करना।',
    'Plastic Reduction & Alternatives': 'प्लास्टिक में कमी और विकल्प',
    'Promoting plastic-free practices, eco-friendly alternatives, and behavioural change toward sustainable consumption habits.': 'प्लास्टिक-मुक्त व्यवहार, पर्यावरण-अनुकूल विकल्प और सतत उपभोग की आदतों को बढ़ावा देना।',
    'Want the full picture?': 'पूरा परिप्रेक्ष्य जानना चाहते हैं?',
    'See how these objectives translate into programs on the ground across Chhattisgarh.': 'देखिए, ये उद्देश्य छत्तीसगढ़ में जमीनी कार्यक्रमों का रूप कैसे लेते हैं।',
    'EXPLORE OUR WORK →': 'हमारा कार्य देखें →', 'Recent programs': 'हाल के कार्यक्रम',
    'From conclaves to village workshops': 'सम्मेलनों से गाँव की कार्यशालाओं तक',
    'A snapshot of our 2026 work. See the full list of climate conclaves and BMC training workshops on the programs page.': 'हमारे 2026 के कार्य की एक झलक। कार्यक्रम पृष्ठ पर जलवायु सम्मेलनों और बीएमसी प्रशिक्षण कार्यशालाओं की पूरी सूची देखें।',
    'Climate Conclave': 'जलवायु सम्मेलन', 'Climate Change Conclave, Durg': 'जलवायु परिवर्तन सम्मेलन, दुर्ग',
    'A multi-stakeholder platform at the Forest Rest House, Durg bringing together officials, experts, academics and students around climate action and Mission LiFE.': 'वन विश्राम गृह, दुर्ग में अधिकारियों, विशेषज्ञों, शिक्षाविदों और छात्रों को जलवायु कार्रवाई व मिशन लाइफ के लिए साथ लाने वाला बहु-हितधारक मंच।',
    'VIEW PROGRAM →': 'कार्यक्रम देखें →', 'BMC Training': 'बीएमसी प्रशिक्षण',
    'BMC Workshops, Dhamtari': 'बीएमसी कार्यशालाएँ, धमतरी',
    'Capacity building for Biodiversity Management Committees on PBR, ABS, avitourism and conservation of rare species like Tendu and pangolins.': 'पीबीआर, एबीएस, एविटूरिज्म तथा तेंदू और पैंगोलिन जैसी दुर्लभ प्रजातियों के संरक्षण पर जैव विविधता प्रबंधन समितियों का क्षमता विकास।',
    'Workshop': 'कार्यशाला', 'Climate Workshop, Kanker': 'जलवायु कार्यशाला, कांकेर',
    "A data-driven session on Chhattisgarh's shifting rainfall, forest fires and rainfed agriculture — and the resilience strategies the state needs.": 'छत्तीसगढ़ की बदलती वर्षा, वनाग्नि और वर्षा-आधारित कृषि तथा आवश्यक अनुकूलन रणनीतियों पर आँकड़ा-आधारित सत्र।',
    'See all programs': 'सभी कार्यक्रम देखें',
    '"Together, we can create lasting and measurable change for our planet and future generations."': '“मिलकर हम अपने ग्रह और आने वाली पीढ़ियों के लिए स्थायी और मापनीय परिवर्तन ला सकते हैं।”',
    'Partner with us on the ground': 'जमीनी स्तर पर हमारे साथ जुड़ें',
    'We welcome institutions, organizations and individuals who share our vision of environmental sustainability and climate responsibility.': 'हम पर्यावरणीय स्थिरता और जलवायु जिम्मेदारी की हमारी सोच साझा करने वाले संस्थानों, संगठनों और व्यक्तियों का स्वागत करते हैं।',

    'Climate action, rooted in community': 'समुदाय में निहित जलवायु कार्रवाई',
    'Who we are, the objectives that guide us, and the districts of Chhattisgarh where we work.': 'हम कौन हैं, हमारे मार्गदर्शक उद्देश्य और छत्तीसगढ़ के वे जिले जहाँ हम कार्य करते हैं।',
    'Who we are': 'हम कौन हैं', 'Grassroots work, driven by collective action': 'सामूहिक प्रयास से संचालित जमीनी कार्य',
    'Since its inception, Earth Retreat Foundation has worked rigorously and consistently towards climate change mitigation and environmental protection.': 'स्थापना से ही अर्थ रिट्रीट फाउंडेशन जलवायु परिवर्तन शमन और पर्यावरण संरक्षण के लिए गंभीरता और निरंतरता से कार्य कर रहा है।',
    'We are actively engaged in awareness programs, community capacity development, biodiversity conservation initiatives, and sustainable environmental practices at the grassroots level. Our commitment is driven by the belief that collective action and informed communities are the key to building a climate-resilient future.': 'हम जमीनी स्तर पर जागरूकता कार्यक्रमों, सामुदायिक क्षमता विकास, जैव विविधता संरक्षण और सतत पर्यावरणीय व्यवहार में सक्रिय हैं। हमारा विश्वास है कि सामूहिक प्रयास और जागरूक समुदाय ही जलवायु-सक्षम भविष्य की कुंजी हैं।',
    'We remain dedicated to expanding our impact through meaningful associations, strategic collaborations, and capacity-building workshops — welcoming partnerships with institutions, organizations and individuals who share our vision.': 'हम सार्थक संबंधों, रणनीतिक सहयोग और क्षमता-विकास कार्यशालाओं से अपना प्रभाव बढ़ाने के लिए प्रतिबद्ध हैं तथा हमारी सोच साझा करने वालों का स्वागत करते हैं।',
    'REPLACE WITH PHOTO — about.jpg': 'फोटो यहाँ लगाएँ — about.jpg',
    'What we set out to achieve': 'हम क्या हासिल करना चाहते हैं',
    'To protect and restore natural ecosystems through afforestation, water conservation, soil health improvement, and the promotion of sustainable resource management practices.': 'वनीकरण, जल संरक्षण, मृदा स्वास्थ्य सुधार और सतत संसाधन प्रबंधन से प्राकृतिक पारिस्थितिक तंत्र की रक्षा और पुनर्स्थापन।',
    'Addressing the Climate Change Crisis': 'जलवायु परिवर्तन संकट का समाधान',
    'To raise awareness about climate change, promote climate-resilient communities, encourage low-carbon lifestyles, and support local climate action initiatives that reduce environmental impact.': 'जलवायु जागरूकता, जलवायु-सक्षम समुदाय, कम-कार्बन जीवनशैली और पर्यावरणीय प्रभाव घटाने वाली स्थानीय पहलों को बढ़ावा देना।',
    'To conserve and enhance biodiversity by protecting native species, restoring habitats, and encouraging community participation in safeguarding local flora and fauna.': 'स्थानीय प्रजातियों की रक्षा, आवास पुनर्स्थापन और वनस्पति व जीव-जंतुओं के संरक्षण में सामुदायिक भागीदारी से जैव विविधता को बचाना व बढ़ाना।',
    'To educate communities, schools and institutions about the harmful effects of plastic pollution on ecosystems, wildlife and human health through workshops, campaigns and outreach programs.': 'कार्यशालाओं और अभियानों से पारिस्थितिकी, वन्यजीव और मानव स्वास्थ्य पर प्लास्टिक प्रदूषण के दुष्प्रभावों की जानकारी देना।',
    'Plastic Reduction & Sustainable Alternatives': 'प्लास्टिक में कमी और सतत विकल्प',
    'To actively promote plastic-free practices by encouraging eco-friendly alternatives, conducting zero-plastic workshops, and supporting behavioural change toward sustainable consumption habits.': 'पर्यावरण-अनुकूल विकल्प, शून्य-प्लास्टिक कार्यशालाओं और व्यवहार परिवर्तन से प्लास्टिक-मुक्त प्रथाओं को बढ़ावा देना।',
    'Our guiding belief': 'हमारा मार्गदर्शक विश्वास',
    'Sustainable development cannot be achieved without active public participation. We build awareness and capacity so communities lead their own conservation.': 'सक्रिय जनभागीदारी के बिना सतत विकास संभव नहीं है। हम जागरूकता और क्षमता विकसित करते हैं ताकि समुदाय स्वयं संरक्षण का नेतृत्व करें।',
    'Our reach': 'हमारी पहुँच', 'Where we work': 'हम कहाँ कार्य करते हैं',
    'Our programs have reached villages across multiple districts of Chhattisgarh, working hand-in-hand with forest staff, BMC members and local communities.': 'हमारे कार्यक्रम छत्तीसगढ़ के अनेक जिलों के गाँवों तक पहुँचे हैं, जहाँ हम वनकर्मियों, बीएमसी सदस्यों और समुदायों के साथ कार्य करते हैं।',
    'Conclaves & Workshops': 'सम्मेलन और कार्यशालाएँ', 'Partners': 'साझेदार',
    'Who we work with': 'हम किनके साथ कार्य करते हैं',
    'As a technical partner, we support government departments in delivering biodiversity and climate programs on the ground.': 'तकनीकी साझेदार के रूप में हम सरकारी विभागों को जमीनी स्तर पर जैव विविधता और जलवायु कार्यक्रम लागू करने में सहयोग देते हैं।',
    'CG Department of Forest & Climate Change': 'छत्तीसगढ़ वन एवं जलवायु परिवर्तन विभाग',
    'CG State Biodiversity Board': 'छत्तीसगढ़ राज्य जैव विविधता बोर्ड',
    'CG State Climate Change Cell': 'छत्तीसगढ़ राज्य जलवायु परिवर्तन प्रकोष्ठ',
    'Local BMCs & Gram Panchayats': 'स्थानीय बीएमसी और ग्राम पंचायतें',
    'Self-Help Groups': 'स्वयं सहायता समूह', 'Share our vision?': 'क्या आप हमारी सोच साझा करते हैं?',
    'We welcome partnerships with institutions, organizations and individuals committed to environmental sustainability.': 'हम पर्यावरणीय स्थिरता के लिए प्रतिबद्ध संस्थानों, संगठनों और व्यक्तियों के साथ साझेदारी का स्वागत करते हैं।',

    'From objectives to action': 'उद्देश्यों से कार्रवाई तक',
    'Five focus areas through which we deliver climate awareness, biodiversity governance and sustainable livelihoods.': 'पाँच प्रमुख क्षेत्र जिनसे हम जलवायु जागरूकता, जैव विविधता प्रशासन और सतत आजीविका पर कार्य करते हैं।',
    'Focus areas': 'प्रमुख कार्यक्षेत्र', 'Five themes that shape our work': 'हमारे कार्य को आकार देने वाले पाँच विषय',
    'Everything we do on the ground in Chhattisgarh flows from five connected commitments — from climate awareness to the rural communities who carry conservation forward.': 'छत्तीसगढ़ में हमारा प्रत्येक जमीनी प्रयास पाँच जुड़े संकल्पों से निकलता है—जलवायु जागरूकता से संरक्षण को आगे बढ़ाने वाले ग्रामीण समुदायों तक।',
    'Awareness that reaches the household': 'जागरूकता जो हर घर तक पहुँचे',
    "We bring climate science down to everyday life through conclaves and village workshops — like our Durg Climate Conclave and the Kanker workshop on Chhattisgarh's shifting rainfall and forest fires. We promote climate-resilient communities, low-carbon lifestyles, and Mission LiFE's shift from mindless consumption to mindful utilisation.": 'सम्मेलनों और ग्राम कार्यशालाओं से हम जलवायु विज्ञान को रोजमर्रा के जीवन से जोड़ते हैं और जलवायु-सक्षम समुदाय, कम-कार्बन जीवनशैली व मिशन लाइफ को बढ़ावा देते हैं।',
    'Climate conclaves and multi-stakeholder dialogues': 'जलवायु सम्मेलन और बहु-हितधारक संवाद',
    'Village workshops on rainfall, forest fires and rainfed agriculture': 'वर्षा, वनाग्नि और वर्षा-आधारित कृषि पर ग्राम कार्यशालाएँ',
    'Promoting Mission LiFE and Pro-Planet habits': 'मिशन लाइफ और प्रकृति-अनुकूल आदतों को बढ़ावा',
    'Towards plastic-free villages': 'प्लास्टिक-मुक्त गाँवों की ओर',
    'We educate communities, schools and institutions about the harm of plastic pollution to ecosystems, wildlife and health — then help them act. We promote eco-friendly alternatives, run zero-plastic workshops, and support simple, practical waste solutions on the ground.': 'हम समुदायों, स्कूलों और संस्थानों को प्लास्टिक प्रदूषण के नुकसान बताते हैं और पर्यावरण-अनुकूल विकल्प व व्यावहारिक अपशिष्ट समाधान अपनाने में सहयोग देते हैं।',
    'Plastic-awareness campaigns and outreach': 'प्लास्टिक जागरूकता अभियान और जनसंपर्क',
    'Reducing single-use plastics in events and villages': 'कार्यक्रमों और गाँवों में एकल-उपयोग प्लास्टिक घटाना',
    'Promoting eco-friendly alternatives and waste solutions': 'पर्यावरण-अनुकूल विकल्प और अपशिष्ट समाधान',
    'Restoring forests, species by species': 'एक-एक प्रजाति के साथ वनों का पुनर्स्थापन',
    'Afforestation and native-species plantation sit at the heart of our environmental preservation work. We restore degraded habitats and champion threatened local species — like Tendu, the ‘Green Gold’ of Chhattisgarh — exploring stump planting, grafting and budding where seed germination is slow.': 'वनीकरण और स्थानीय प्रजातियों का रोपण हमारे संरक्षण कार्य के केंद्र में है। हम क्षतिग्रस्त आवासों और तेंदू जैसी संकटग्रस्त स्थानीय प्रजातियों को पुनर्जीवित करते हैं।',
    'Afforestation with native, site-matched species': 'स्थानीय और स्थल-अनुकूल प्रजातियों से वनीकरण',
    'Reviving threatened species such as Tendu': 'तेंदू जैसी संकटग्रस्त प्रजातियों का पुनर्जीवन',
    'Supporting community nurseries and survival monitoring': 'सामुदायिक नर्सरी और पौध जीवितता निगरानी',
    'Protecting the species communities live alongside': 'समुदायों के आसपास की प्रजातियों की रक्षा',
    "We conserve and enhance biodiversity by protecting native species and habitats, and by helping villages document their natural wealth in the People's Biodiversity Register (PBR). From medicinal plants to endangered pangolins and rich birdlife, we turn local knowledge into lasting conservation.": 'हम स्थानीय प्रजातियों व आवासों की रक्षा करते हैं और गाँवों को अपनी प्राकृतिक संपदा जन जैव विविधता रजिस्टर में दर्ज करने में सहयोग देते हैं।',
    'Strengthening BMCs and preparing PBRs': 'बीएमसी सशक्तिकरण और पीबीआर तैयार करना',
    'Documenting rare, medicinal and endangered species': 'दुर्लभ, औषधीय और संकटग्रस्त प्रजातियों का दस्तावेजीकरण',
    'Avitourism and bird-watching for conservation': 'संरक्षण के लिए एविटूरिज्म और पक्षी-दर्शन',
    'Communities that lead their own conservation': 'अपने संरक्षण का नेतृत्व करते समुदाय',
    "Sustainable development cannot happen without active public participation. We build the capacity of BMC members, forest staff and women's self-help groups — on biodiversity, PBR, and Access & Benefit Sharing (ABS) — and open up eco-tourism and home-stay livelihoods so conservation also brings income.": 'हम बीएमसी सदस्यों, वनकर्मियों और महिला स्वयं सहायता समूहों की जैव विविधता, पीबीआर व एबीएस पर क्षमता विकसित करते हैं और इको-टूरिज्म व होम-स्टे आजीविका के अवसर खोलते हैं।',
    'Training for BMC members, forest staff and SHGs': 'बीएमसी सदस्यों, वनकर्मियों और स्वयं सहायता समूहों का प्रशिक्षण',
    'Hands-on PBR and ABS literacy': 'व्यावहारिक पीबीआर और एबीएस जानकारी',
    'Eco-tourism and home-stay livelihood models': 'इको-टूरिज्म और होम-स्टे आजीविका मॉडल',
    'Invite us for a workshop or conclave': 'हमें कार्यशाला या सम्मेलन के लिए आमंत्रित करें',
    'We design climate, biodiversity and plastic-awareness sessions for departments, schools and communities.': 'हम विभागों, स्कूलों और समुदायों के लिए जलवायु, जैव विविधता और प्लास्टिक जागरूकता सत्र तैयार करते हैं।',
    'Get in touch': 'संपर्क करें',

    'Work you can walk through': 'वह कार्य जिसे आप करीब से देख सकते हैं',
    'Our 2026 climate conclaves and BMC training workshops, with the species and livelihood learnings they surfaced.': 'हमारे 2026 के जलवायु सम्मेलन और बीएमसी प्रशिक्षण कार्यशालाएँ तथा उनसे मिली प्रजाति व आजीविका संबंधी सीख।',
    '2026 programs': '2026 के कार्यक्रम',
    'Conclaves, workshops & field training': 'सम्मेलन, कार्यशालाएँ और मैदानी प्रशिक्षण',
    'A record of our recent climate conclaves and BMC capacity-building workshops across Chhattisgarh.': 'छत्तीसगढ़ में हमारे हाल के जलवायु सम्मेलनों और बीएमसी क्षमता-विकास कार्यशालाओं का विवरण।',
    'Forest Rest House, Durg': 'वन विश्राम गृह, दुर्ग', 'Makdi Hotel, Kanker': 'माकड़ी होटल, कांकेर',
    'North Singpur, Dhamtari — Day 1': 'उत्तर सिंगपुर, धमतरी — पहला दिन',
    'Birgudi, Dhamtari — Day 2': 'बिरगुड़ी, धमतरी — दूसरा दिन',
    'Gurur, Balod': 'गुरूर, बालोद',
    'Mohla-Manpur-Ambagarh Chowki — Day 1 & 2': 'मोहला-मानपुर-अंबागढ़ चौकी — पहला और दूसरा दिन',
    'Climate Change Workshop, Kanker': 'जलवायु परिवर्तन कार्यशाला, कांकेर',
    'BMC Training & Awareness, Mohndi': 'बीएमसी प्रशिक्षण एवं जागरूकता, मोहंदी',
    'BMC Training & Awareness, Dugli': 'बीएमसी प्रशिक्षण एवं जागरूकता, दुगली',
    'BMC Training & Awareness, Badbhoom': 'बीएमसी प्रशिक्षण एवं जागरूकता, बड़भूम',
    'BMC Training, Mohla & Ambagarh Chowki': 'बीएमसी प्रशिक्षण, मोहला एवं अंबागढ़ चौकी',
    'Overall message: “Save Environment, Save Future.”': 'समग्र संदेश: “पर्यावरण बचाएँ, भविष्य बचाएँ।”',
    'Organized by CG Forest & Climate Change Dept, CG State Climate Change & Earth Retreat Foundation': 'आयोजक: छत्तीसगढ़ वन एवं जलवायु परिवर्तन विभाग, राज्य जलवायु परिवर्तन प्रकोष्ठ और अर्थ रिट्रीट फाउंडेशन',
    'Technical Partner: Earth Retreat Foundation': 'तकनीकी साझेदार: अर्थ रिट्रीट फाउंडेशन',
    'Key learnings': 'प्रमुख सीख', 'What the field is telling us': 'मैदान से मिल रही सीख',
    'Species': 'प्रजातियाँ', 'Reviving Tendu': 'तेंदू का पुनर्जीवन',
    'Communities flagged the decline of Tendu — the “Green Gold” of Chhattisgarh. With germination success often near 40%, we are exploring stump planting, grafting and budding as vegetative alternatives.': 'समुदायों ने छत्तीसगढ़ के “हरे सोने” तेंदू में गिरावट बताई। कम अंकुरण के कारण हम स्टंप रोपण, ग्राफ्टिंग और बडिंग जैसे विकल्प खोज रहे हैं।',
    'Wildlife': 'वन्यजीव', 'Protecting Pangolins': 'पैंगोलिन संरक्षण',
    'Sightings of endangered pangolins were reported, with numbers falling due to poaching driven by misconceptions. Focused wildlife conservation work in these areas is a clear future priority.': 'संकटग्रस्त पैंगोलिन देखे जाने की सूचना मिली, जबकि अवैध शिकार से उनकी संख्या घट रही है। इन क्षेत्रों में केंद्रित वन्यजीव संरक्षण हमारी प्राथमिकता है।',
    'Livelihoods': 'आजीविका', 'Avitourism potential': 'एविटूरिज्म की संभावना',
    'Areas bordering tiger reserves hold rich bird diversity. With training and surveys, BMCs can launch bird-watching enterprises that improve livelihoods and conserve species at once.': 'टाइगर रिज़र्व से लगे क्षेत्रों में समृद्ध पक्षी विविधता है। प्रशिक्षण से बीएमसी पक्षी-दर्शन उद्यम शुरू कर सकती हैं, जो आजीविका और संरक्षण दोनों को मजबूत करें।',
    'Bring a program to your district': 'अपने जिले में कार्यक्रम लाएँ',
    'We work with forest departments, panchayats and institutions to deliver climate and biodiversity programs.': 'हम वन विभागों, पंचायतों और संस्थानों के साथ जलवायु व जैव विविधता कार्यक्रम संचालित करते हैं।',
    'Start a conversation': 'बातचीत शुरू करें',

    'Field diary': 'मैदानी डायरी', 'Our work, chapter by chapter': 'हमारा कार्य, अध्याय-दर-अध्याय',
    'Every event we run is recorded here as a chapter — with the full write-up, a photo gallery, press coverage and videos. New chapters are added automatically as our team documents them in the field.': 'हमारा हर आयोजन यहाँ एक अध्याय के रूप में दर्ज है—पूरी रिपोर्ट, फोटो गैलरी, प्रेस कवरेज और वीडियो सहित।',
    'Browse the field diary': 'मैदानी डायरी देखें', 'Loading chapters…': 'अध्याय लोड हो रहे हैं…',
    'No chapters have been published yet. They will appear here automatically once the team adds them.': 'अभी कोई अध्याय प्रकाशित नहीं हुआ है। टीम द्वारा जोड़े जाने पर वे यहाँ स्वतः दिखाई देंगे।',
    'Could not load chapters right now.': 'अभी अध्याय लोड नहीं हो सके।',
    'All themes': 'सभी विषय', 'READ CHAPTER →': 'अध्याय पढ़ें →',

    'People who know the land': 'वे लोग जो इस धरती को जानते हैं',
    'The resource persons who lead our biodiversity and climate training across Chhattisgarh.': 'छत्तीसगढ़ में हमारे जैव विविधता और जलवायु प्रशिक्षण का नेतृत्व करने वाले विशेषज्ञ।',
    'Our experts': 'हमारे विशेषज्ञ', 'The people leading our sessions': 'हमारे सत्रों का नेतृत्व करने वाले लोग',
    'Our resource persons deliver biodiversity and climate training across Chhattisgarh. Update names, photos and bios as your team grows.': 'हमारे विशेषज्ञ पूरे छत्तीसगढ़ में जैव विविधता और जलवायु प्रशिक्षण देते हैं। टीम के विस्तार के साथ नाम, फोटो और परिचय अपडेट करें।',
    'Biodiversity & BMC Specialist': 'जैव विविधता एवं बीएमसी विशेषज्ञ',
    'Leads sessions on biodiversity, what BMCs are and how they are formed, their structure and member roles, and how committees can better conserve and manage regional biodiversity — drawing on successful BMC examples nationwide.': 'जैव विविधता, बीएमसी गठन, संरचना, सदस्यों की भूमिका और क्षेत्रीय जैव विविधता के बेहतर संरक्षण पर सत्रों का नेतृत्व करती हैं।',
    'PBR Specialist': 'पीबीआर विशेषज्ञ',
    "Focuses on the People's Biodiversity Register — its importance, benefits and challenges, the process of preparing a PBR, and the status of PBR work across India and Chhattisgarh.": 'जन जैव विविधता रजिस्टर के महत्व, लाभ, चुनौतियों और निर्माण प्रक्रिया पर केंद्रित।',
    'Access & Benefit Sharing (ABS)': 'एक्सेस एंड बेनिफिट शेयरिंग (एबीएस)',
    'Explains ABS and how communities benefit, the share due to BMCs, and monetary and non-monetary benefits — using cases like neem and turmeric to address bio-piracy.': 'एबीएस, समुदायों को मिलने वाले लाभ और बीएमसी की हिस्सेदारी को नीम व हल्दी जैसे उदाहरणों से समझाते हैं।',
    'Birds & Avitourism': 'पक्षी एवं एविटूरिज्म',
    'Presents on the importance and conservation of birds, regional avian diversity, and avitourism models through which BMCs can generate revenue from bird-watching activities.': 'पक्षियों के संरक्षण, क्षेत्रीय पक्षी विविधता और पक्षी-दर्शन से आय बढ़ाने वाले एविटूरिज्म मॉडल प्रस्तुत करते हैं।',
    'Trees & Forest Resources': 'वृक्ष एवं वन संसाधन',
    'Highlights trees as a biodiversity asset, the conservation of rare and endangered species such as Dahiman, and the medicinal and ecological value of local flora.': 'वृक्षों को जैव विविधता संपदा के रूप में, दहीमान जैसी दुर्लभ प्रजातियों के संरक्षण और स्थानीय वनस्पति के मूल्य को रेखांकित करते हैं।',
    'Technological Specialist': 'तकनीकी विशेषज्ञ',
    'Works on technicalities of resources, machineries, digital infrastructure, and marketing opportunities for BMCs - value-added tech support to sustainable income for local communities.': 'यें बीएमसी के लिए संसाधनों, मशीनों, डिजिटल इंफ्रास्ट्रक्चर और मार्केटिंग से जुडी प्रौद्योगिकियों पर काम करते हैं – यानी, स्थानीय समुदायों की निरंतर आमदनी के लिए महत्वपूर्ण तकनिकी सहायता देतें हैं।',
    'Join us as an expert or volunteer': 'विशेषज्ञ या स्वयंसेवक के रूप में जुड़ें',
    "We're always looking for ecologists, trainers and field volunteers for our workshops and surveys.": 'हम कार्यशालाओं और सर्वेक्षणों के लिए पारिस्थितिकी विशेषज्ञों, प्रशिक्षकों और मैदानी स्वयंसेवकों की तलाश में रहते हैं।',
    'Reach out': 'हमसे संपर्क करें',

    "Let's work together": 'आइए, मिलकर काम करें',
    "Partnerships, workshops, BMC support or volunteering — we'd love to hear from you.": 'साझेदारी, कार्यशाला, बीएमसी सहयोग या स्वयंसेवा—हम आपसे सुनना चाहेंगे।',
    "Whether you want to organise a workshop, partner on a program, or volunteer in the field — write to us and we'll respond within a few working days.": 'आप कार्यशाला आयोजित करना चाहते हों, साझेदारी या मैदानी स्वयंसेवा—हमें लिखें, हम कुछ कार्यदिवसों में उत्तर देंगे।',
    'Email': 'ईमेल', 'Phone': 'फ़ोन', 'Your name': 'आपका नाम',
    "I'm interested in": 'मेरी रुचि है', 'Organising a workshop / conclave': 'कार्यशाला / सम्मेलन आयोजित करना',
    'Partnership / collaboration': 'साझेदारी / सहयोग', 'BMC & PBR support': 'बीएमसी और पीबीआर सहयोग',
    'Volunteering': 'स्वयंसेवा', 'Plastic awareness program': 'प्लास्टिक जागरूकता कार्यक्रम',
    'Something else': 'अन्य', 'Message': 'संदेश', 'Send message': 'संदेश भेजें',
    'Thank you — your message has been recorded. Connect this form to your email or backend to receive submissions.': 'धन्यवाद—आपका संदेश दर्ज कर लिया गया है। संदेश प्राप्त करने के लिए इस फॉर्म को ईमेल या बैकएंड से जोड़ें।',
    'Open menu': 'मेनू खोलें', 'Close': 'बंद करें', 'Filter by theme': 'विषय के अनुसार फ़िल्टर करें',
    'Language': 'भाषा',
    'Earth Retreat Foundation | Climate Action & Biodiversity in Chhattisgarh': 'अर्थ रिट्रीट फाउंडेशन | छत्तीसगढ़ में जलवायु कार्रवाई और जैव विविधता',
    'About | Earth Retreat Foundation': 'हमारे बारे में | अर्थ रिट्रीट फाउंडेशन',
    'What We Do | Earth Retreat Foundation': 'हम क्या करते हैं | अर्थ रिट्रीट फाउंडेशन',
    'Programs | Earth Retreat Foundation': 'कार्यक्रम | अर्थ रिट्रीट फाउंडेशन',
    'Field Diary | Earth Retreat Foundation': 'मैदानी डायरी | अर्थ रिट्रीट फाउंडेशन',
    'Team | Earth Retreat Foundation': 'टीम | अर्थ रिट्रीट फाउंडेशन',
    'Contact | Earth Retreat Foundation': 'संपर्क | अर्थ रिट्रीट फाउंडेशन',
    'Mar 2026': 'मार्च 2026', 'May 2026': 'मई 2026',
    'Piperchedi': 'पाइपरछेड़ी', 'Gariyaband': 'गरियाबंद',
    'Sonjhari, South Singpur': 'सोनझरी, दक्षिण सिंगपुर', 'Dhamtari': 'धमतरी',
    'Dokal, Keregaon': 'डोकाल, केरेगांव', 'Mohndi, North Singpur': 'मोहंदी, उत्तर सिंगपुर',
    'Gattasilli, Birgudi': 'गट्टासिल्ली, बिरगुड़ी', 'Badbhoom, Gurur': 'बड़भूम, गुरूर',
    'Balod': 'बालोद', 'Dugli, Birgudi': 'दुगली, बिरगुड़ी',
    'Mohla & Ambagarh Chowki': 'मोहला एवं अंबागढ़ चौकी', 'Mohla-Manpur': 'मोहला-मानपुर',
    'Durg & Kanker': 'दुर्ग एवं कांकेर',
    'Durg · Dhamtari · Balod · Kanker · Gariyaband · Mohla': 'दुर्ग · धमतरी · बालोद · कांकेर · गरियाबंद · मोहला',
    '— Earth Retreat Foundation': '— अर्थ रिट्रीट फाउंडेशन',
    'The story, objectives and reach of Earth Retreat Foundation, a grassroots environmental NGO in Chhattisgarh.': 'छत्तीसगढ़ की जमीनी पर्यावरण संस्था अर्थ रिट्रीट फाउंडेशन की कहानी, उद्देश्य और पहुँच।',
    'Field diary of Earth Retreat Foundation — event reports, photo galleries, press coverage and videos, chapter by chapter.': 'अर्थ रिट्रीट फाउंडेशन की मैदानी डायरी—आयोजन रिपोर्ट, फोटो गैलरी, प्रेस कवरेज और वीडियो, अध्याय-दर-अध्याय।',
    'Get in touch with Earth Retreat Foundation to partner, organise a workshop, or volunteer.': 'साझेदारी, कार्यशाला आयोजन या स्वयंसेवा के लिए अर्थ रिट्रीट फाउंडेशन से संपर्क करें।',
    'Earth Retreat Foundation is a grassroots environmental NGO in Chhattisgarh working on climate change awareness, biodiversity conservation, BMC & PBR support, and plastic reduction.': 'अर्थ रिट्रीट फाउंडेशन छत्तीसगढ़ में जलवायु जागरूकता, जैव विविधता संरक्षण, बीएमसी व पीबीआर सहयोग और प्लास्टिक में कमी पर कार्यरत जमीनी पर्यावरण संस्था है।',
    'Climate conclaves and BMC capacity-building workshops conducted by Earth Retreat Foundation across Chhattisgarh in 2026.': 'अर्थ रिट्रीट फाउंडेशन द्वारा 2026 में छत्तीसगढ़ में आयोजित जलवायु सम्मेलन और बीएमसी क्षमता-विकास कार्यशालाएँ।',
    'Climate awareness, biodiversity conservation, BMC & PBR support, ABS, eco-tourism and plastic reduction by Earth Retreat Foundation.': 'अर्थ रिट्रीट फाउंडेशन द्वारा जलवायु जागरूकता, जैव विविधता संरक्षण, बीएमसी व पीबीआर सहयोग, एबीएस, इको-टूरिज्म और प्लास्टिक में कमी।',
    'Meet the experts and resource persons of Earth Retreat Foundation.': 'अर्थ रिट्रीट फाउंडेशन के विशेषज्ञों और संसाधन व्यक्तियों से मिलें।'
  };

  var textOriginals = new WeakMap();
  var attributeOriginals = new WeakMap();
  var language = localStorage.getItem(STORAGE_KEY);
  if (language !== 'en' && language !== 'hi') {
    language = (navigator.language || '').toLowerCase().indexOf('hi') === 0 ? 'hi' : 'en';
  }

  function clean(value) { return (value || '').replace(/\s+/g, ' ').trim(); }
  function lookup(value) {
    var key = clean(value);
    if (hi[key]) return hi[key];
    var chapter = key.match(/^Chapter\s+(\d+)$/i);
    if (chapter) return 'अध्याय ' + chapter[1];
    var published = key.match(/^(\d+) chapters? published\. Tap any chapter to read the full report, photos, press coverage and videos\.$/);
    if (published) return published[1] + ' अध्याय प्रकाशित। पूरी रिपोर्ट, फोटो, प्रेस कवरेज और वीडियो के लिए किसी अध्याय पर टैप करें।';
    return null;
  }
  function text(node) {
    if (!textOriginals.has(node)) textOriginals.set(node, node.nodeValue);
    var source = textOriginals.get(node);
    if (language === 'en') { node.nodeValue = source; return; }
    var replacement = lookup(source);
    if (replacement) node.nodeValue = source.match(/^\s*/)[0] + replacement + source.match(/\s*$/)[0];
  }
  function attributes(element) {
    ['aria-label', 'placeholder', 'title'].forEach(function (name) {
      if (!element.hasAttribute(name)) return;
      var saved = attributeOriginals.get(element) || {};
      if (!(name in saved)) saved[name] = element.getAttribute(name);
      attributeOriginals.set(element, saved);
      element.setAttribute(name, language === 'hi' ? (lookup(saved[name]) || saved[name]) : saved[name]);
    });
  }
  function translate(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) { text(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE) attributes(root);
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (!node.parentElement || /^(SCRIPT|STYLE|SVG|CODE)$/i.test(node.parentElement.tagName)) continue;
        text(node);
      } else attributes(node);
    }
  }
  function updatePrograms() {
    var events = document.querySelector('.events');
    if (events) events.classList.toggle('show-hi', language === 'hi');
    var legacy = document.querySelector('.lang-toggle');
    if (legacy) legacy.hidden = true;
  }
  function updateButtons() {
    document.querySelectorAll('.site-language button').forEach(function (button) {
      var active = button.dataset.language === language;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }
  function apply(next) {
    language = next === 'hi' ? 'hi' : 'en';
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.body.classList.toggle('lang-hi', language === 'hi');
    translate(document.body);
    var originalTitle = document.documentElement.dataset.originalTitle || document.title;
    document.documentElement.dataset.originalTitle = originalTitle;
    document.title = language === 'hi' ? (lookup(originalTitle) || originalTitle) : originalTitle;
    var description = document.querySelector('meta[name="description"]');
    if (description) {
      var originalDescription = description.dataset.originalContent || description.content;
      description.dataset.originalContent = originalDescription;
      description.content = language === 'hi' ? (lookup(originalDescription) || originalDescription) : originalDescription;
    }
    updatePrograms();
    updateButtons();
    document.dispatchEvent(new CustomEvent('erf:languagechange', { detail: { language: language } }));
  }
  function addSwitcher() {
    var nav = document.querySelector('.nav');
    if (!nav || nav.querySelector('.site-language')) return;
    var switcher = document.createElement('div');
    switcher.className = 'site-language';
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', 'Language');
    switcher.innerHTML = '<button type="button" data-language="en" aria-label="English">EN</button><button type="button" data-language="hi" aria-label="हिंदी">हिं</button>';
    switcher.addEventListener('click', function (event) {
      var button = event.target.closest('button[data-language]');
      if (button) apply(button.dataset.language);
    });
    nav.insertBefore(switcher, nav.querySelector('.menu-btn'));
  }

  document.addEventListener('DOMContentLoaded', function () {
    addSwitcher();
    apply(language);
    new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(translate);
      });
      updatePrograms();
    }).observe(document.body, { childList: true, subtree: true });
  });

  window.ERFI18n = {
    getLanguage: function () { return language; },
    setLanguage: apply,
    translate: function (value) { return language === 'hi' ? (lookup(value) || value) : value; }
  };
})();
