import React from 'react'
import { useSelector } from 'react-redux'
import { lang } from '../Redux/Slice/userAppDataSlice'
import Header from '../Component/Header';

export default function UsageInfo() {
  const language = useSelector(lang);
  const content = {
    english: "<h1>Introducing Siksarthi: Your Ultimate Reading Companion</h1><p>As an avid reader and enthusiast of knowledge and wisdom found in books, I recognized the need for a solution to streamline my reading experience. While I cherish my collection of paperback books, I also enjoy the convenience of digital reading on my devices. However, I often found myself forgetting which book I was reading and the page I had last left off on, hindering my learning journey.</p><p>To address this challenge, I developed Siksarthi. This innovative app serves as your personalized library, seamlessly synchronizing your reading progress across all your devices. With Siksarthi, you can effortlessly pick up where you left off, eliminating the frustration of losing your place in a book.</p><p>Key Features:</p><ul class='[&>*]:m-6 list-disc'> <li>Library: Access your entire book collection and seamlessly transition between devices, picking up right where you left off.</li><li>Bookmarks: Mark important passages or save books for later reading, ensuring you never lose track of valuable insights.</li> <li>Chapters Feature: Easily navigate through your book with the ability to view the current page number. Clicking on the page number reveals a chapter index, allowing for quick access to any chapter.</li></ul><h2>Stay Connected:</h2> <p>I occasionally share updates and insights on social media platforms. Feel free to connect with me on Twitter: <a class='text-sky-600' href='https://twitter.com/the_frontendev'>@the_frontendev</a></p><p>For any inquiries or feedback, you can reach me via email at  <a class='text-sky-600' href='mailto:ChatanSharma000@gmail.com'>ChatanSharma000@gmail.com</a></p><h3>Disclaimer:</h3><ul class='[&>*]:m-6 list-disc'><li>Educational Purposes Only: This app is intended for educational purposes and personal use only.</li><li>Content Ownership: All content within the app belongs to its respective copyright holders. We do not claim ownership of any included material.</li><li>Contact: In case of any concerns regarding copyright or the content within the app, please contact us at Email.</li></ul>",
    hindi: "<h1>पेश करते हैं: सिक्सार्थी: आपका अंतिम पढ़ाई का साथी</h1><p>मैं एक लाइब्रेरी बनाने का काम कर रहा हूं जिसका नाम है 'सिक्सार्थी'. यह एक ऐसी ऐप है जो आपको अपनी पुस्तकों को ऑनलाइन पढ़ने और सेव करने की सुविधा देती है। जैसे कि हम सभी जानते हैं कि पुस्तकें हमें बहुत सारा ज्ञान देती हैं, और मैं भी पुस्तकें पढ़ने का बहुत ही शौकीन रहा हूं।</p><p>मुझे अपनी पुस्तकों को पढ़ने के लिए बहुत सारे गैजेट्स या डिवाइसेज़ पसंद हैं, लेकिन कभी-कभी मैं भूल जाता हूँ कि मैंने किस पुस्तक की पढ़ाई थी और किस पेज पर था। यह मेरी पढ़ाई को बाधित करता था।</p><p>इस समस्या का हल निकालने के लिए, मैंने 'सिक्सार्थी' बनाया। इस ऐप की सहायता से आप आसानी से अपनी पढ़ाई को संभाल सकते हैं। सिक्सार्थी आपके सभी डिवाइसेज़ पर आपकी पुस्तकों को संक्रमित करता है, ताकि आप अपने पढ़ने का कार्य अंगद न रहें। यह आपको अपनी पुस्तक के पृष्ठ का पता लगाने में भी मदद करता है।</p><p>मुख्य विशेषताएं:</p><ul class='[&>*]:m-6 list-disc text-white'><li>लाइब्रेरी: अपनी पुस्तक संग्रह का उपयोग करें और अपने सभी डिवाइसेज़ के बीच स्थानांतरण करें, जहां आपने छोड़ा था वही से आगे बढ़ें।</li><li>बुकमार्क: महत्वपूर्ण अंशों को चिह्नित करें या पुस्तकों को बाद में पढ़ने के लिए सहेजें, ताकि आप कभी भी महत्वपूर्ण अंशों को न खोएं।</li><li>अध्याय विशेषता: अपनी पुस्तक के माध्यम से आसानी से नेविगेट करें। वर्तमान पृष्ठ संख्या देखें और चैप्टर इंडेक्स तक पहुंचने के लिए पृष्ठ संख्या पर क्लिक करें।</li></ul><h2>जुड़े रहें:</h2><p>मैं कभी-कभी सोशल मीडिया पर अपडेट और विचारों को साझा करता हूँ। मुझसे ट्विटर पर जुड़ने के लिए यहां क्लिक करें:<a class='text-sky-600'  href='https://twitter.com/the_frontendev'> @the_frontendev</a></p><p>किसी भी प्रश्न या प्रतिक्रिया के लिए, आप मुझसे ईमेल के माध्यम से संपर्क कर सकते हैं: <a class='text-sky-600' href='mailto:ChatanSharma000@gmail.com'>ChatanSharma000@gmail.com</a></p><h3> अस्वीकरण:</h3><ul class='list-disc m-6'><li>सिर्फ शैक्षणिक उद्देश्यों के लिए: यह ऐप केवल शैक्षणिक उद्देश्यों और व्यक्तिगत उपयोग के लिए है।</li><li>सामग्री का स्वामित्व: ऐप के अंदर सभी सामग्री उनके संबंधित कॉपीराइट धारकों की है। हम किसी भी शामिल सामग्री के स्वामित्व का दावा नहीं करते हैं।</li><li>संपर्क करें: कॉपीराइट या ऐप के भीतर की सामग्री से संबंधित किसी भी चिंता के मामले में, कृपया हमें ईमेल पर संपर्क करें।</li></ul>"
  }
  return (
    <>
      <Header backToPath={true} />
      <div className='space-y-6 p-3 text-lg' dangerouslySetInnerHTML={{ __html: content[language] }}></div>
    </>
  )
}