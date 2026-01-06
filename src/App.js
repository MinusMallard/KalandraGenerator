import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { PlusCircle, Trash2, FileDown, RefreshCw, Lock, Unlock } from 'lucide-react';

// --- 1. REGISTER FONTS ---
Font.register({
  family: 'NotoSansDevanagari',
  fonts: [
    { src: '/fonts/NotoSansDevanagari-Regular.ttf' },
    { src: '/fonts/NotoSansDevanagari-Bold.ttf', fontWeight: 'bold' },
  ],
});

// --- 2. PDF STYLES ---
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'NotoSansDevanagari', fontSize: 11, lineHeight: 1.5 },
  header: { textAlign: 'center', marginBottom: 10, fontWeight: 'bold', fontSize: 12, textDecoration: 'underline' },
  subHeader: { marginBottom: 5, fontSize: 11, fontWeight: 'bold' },
  bold: { fontWeight: 'bold' },
  text: { marginBottom: 8, textAlign: 'justify' },
  table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0, marginTop: 10, marginBottom: 10 },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: { width: "15%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableColWide: { width: "60%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableColSmall: { width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCell: { margin: 5, fontSize: 10 },
  signatureSection: { marginTop: 30, flexDirection: 'column', alignItems: 'flex-end' },
  signatureLeft: { marginTop: 30, flexDirection: 'column', alignItems: 'flex-start' },
  divider: { borderBottomWidth: 1, borderBottomColor: '#000', marginVertical: 10 },
});

// --- 3. HELPER FUNCTIONS (TEXT GENERATORS) ---

const getAccusedString = (accused) => {
  return accused.map((acc, index) => 
    `(${index + 1}) ${acc.name} S/o ${acc.fatherName} R/o ${acc.address} Age- ${acc.age} yrs`
  ).join(' ');
};

const getAccusedNamesOnly = (accused) => {
  return accused.map((acc, index) => `(${index + 1}) ${acc.name}`).join(' ');
};

const generateMainBody = (data) => {
  const { ddNo, date, placeOfIncident, ioName, ioRank, ioBelt, ctName, ctRank, ctBelt, accused } = data;
  const accusedCount = accused.length;
  const groupTerm = accusedCount > 2 ? 'चारों' : 'दोनो';
  const accusedString = getAccusedString(accused);
  const accusedNames = getAccusedNamesOnly(accused);
  
  // Use Place of Incident if available, otherwise dots
  const incidentLoc = placeOfIncident || '...........................';

  return `श्रीमान जी, संक्षिप्त हालात कलंदरा इस तौर पर हैं कि आज दिनांक ${date} को मन ${ioRank} मय हमराही ${ctRank} ${ctName} No. ${ctBelt} हाजिर थाना आया हूँ और अपने हमराह मुस्स्मी ${accusedString} को U/s 126/170 BNSS में गिरफ्तार करके लाया हूँ और हालात गिरफ्तारी इस तौर पर है की मन ${ioRank} की Emergency Duty के दौरान ${ctRank} ${ctName} No. ${ctBelt} को PCR CALL DD No - ${ddNo} Dt- ${date} मिलने पर मन ${ioRank} मय हमराही स्टाफ PCR Call मे दिये गये पता ${incidentLoc} पर पहुँचा तो वहां पर ${accusedCount} शक्श जोर जोर से गन्दी गन्दी व भद्दी भद्दी गालिया देने लग रहे थे और एक दुसरे को मरने मारने पर ऊतारू हो रहे थे जिसकी इस हरकत पर लोगो की काफी भीड जमा हो रही थी ओर इलाके की शांति भंग हो रही थी और वहा पर मौजूद भीड़ काफी बुरा मना रही थी और वह ${groupTerm} शक्स बोल रहे थे की हमारा कोई कुछ नही बिगाड़ सकता है पुलिस हमारा कुछ नही बिगाड़ सकती और आने जाने वालो को भी गाली गलौच करने लगे जिससे आस पास भीड़ जमा होने लगी।

जो मन ${ioRank} ने ${ctRank} ${ctName} No. ${ctBelt} की मदद से उन ${groupTerm} शक्सो को काबू किया जो काफी तैश में थे | जिनका नाम व पता बाद दरियाफ्त ${accusedNames} मालूम चला |

जो मन ${ioRank} ने उपरोक्त ${groupTerm} शख्शो को काफी समझाने की कोशिश की जो कह रहे थे कि हम यहां के दादा है और हमारा कोई कुछ नही बिगाड़ सकता है। जो वह अपनी हरकतो से बाज नहीं आ रहे थे|

जो मन ${ioRank} ने तमाम हालात जनाब SHO साहब को बतलाये जिन्होंने ACP साहब से Discuss करके Preventive Action U/S 126/170 BNSS अमल में लाने का आदेश फरमाया|

जो मन ${ioRank} ने मुसम्मी ${accusedNames} को हालात बतलाकर दरियाफ्त अमल में लाई| जो मन ${ioRank} ने मुसम्मी ${accusedNames} को U/S 126/170 BNSS में बाद बतलाकर कारण गिरफ्तारी हस्ब जाफ्ता गिरफ्तार किया और गिरफ्तारी के समय माननीय सुप्रीम कोर्ट के तमाम आदेशो का पालन किया व उनकी गिरफतारी की सूचना मुताबिक़ Arrest Memo दी व accused की personal search अमल में लाइ गई जिससे कोई शह बरामद नहीं हुई है, अगर मन ${ioRank} ने उपरोक्त accused के खिलाफ U/S 126/170 BNSS की कार्यवाही न की होती तो वह ${groupTerm} शक्श उस समय कोई भी cognizable offence कर सकते थे, इसके बाद मन ${ioRank} ने उपरोक्त ${groupTerm} accused का Burari Hospital, Delhi में Medical Examination कराया जो मुलजिमो को बाद खिलाकर खाना मामूरा संतरी से चेक कराकर बंदी हवालात किया गया।

जो उपरोक्त ${groupTerm} Accused को कलंदरा 126/170 BNSS का तैयार करके बजरिये कलन्दरा U/S 126/170 BNSS माननीय SEM OND साहब की कोर्ट में पेश किया जायेगा|

समायत फरमाई जावे। रपट इतलान दर्ज है।`;
};

const generateCtStatement = (data) => {
  const { ddNo, date, placeOfIncident, ctName, ctRank, accused } = data;
  const accusedCount = accused.length;
  const groupTerm = accusedCount > 2 ? 'चारों' : 'दोनो';
  const accusedString = getAccusedString(accused);
  const accusedNames = getAccusedNamesOnly(accused);
  const incidentLoc = placeOfIncident || '...........................';

  return `बयान किया की मै थाना Bhalaswa dairy में बतौर ${ctRank} तैनात हूँ | आज दिनांक ${date} को अपने हमराह मुस्स्मी ${accusedString} को U/s 126/170 BNSS में गिरफ्तार करके लाया हूँ और हालात गिरफ्तारी इस तौर पर है की आपकी Emergency Duty के दौरान PCR CALL DD NO. ${ddNo} DT ${date} मिलने पर PCR Call मे दिये गये पता ${incidentLoc} पर पहुँचा तो वहां पर ${accusedCount} शक्श जोर जोर से गन्दी गन्दी व भद्दी भद्दी गालिया देने लग रहे थे और एक दुसरे को मरने मारने पर ऊतारू हो रहे थे जिसकी इस हरकत पर लोगो की काफी भीड जमा हो रही थी ओर इलाके की शांति भंग हो रही थी और वहा पर मौजूद भीड़ काफी बुरा मना रही थी और वह ${groupTerm} शक्स बोल रहे थे की हमारा कोई कुछ नही बिगाड़ सकता है पुलिस हमारा कुछ नही बिगाड़ सकती और आने जाने वालो को भी गाली गलौच करने लगे जिससे आस पास भीड़ जमा होने लगी।

जो आपने मेरी मदद से उन ${groupTerm} शक्सो को काबू किया जो काफी तैश में थे| जिनका नाम व पता बाद दरियाफ्त ${accusedNames} मालूम चला | जो आपने उपरोक्त ${groupTerm} शख्शो को काफी समझाने की कोशिश की जो कह रहे थे कि हम यहां के दादा है और हमारा कोई कुछ नही बिगाड़ सकता है। जो वह अपनी हरकतो से बाज नहीं आ रहे थे|

जो आपने तमाम हालात जनाब SHO साहब को बतलाये जिन्होंने ACP साहब से Discuss करके Preventive Action U/S 126/170 BNSS अमल में लाने का आदेश फरमाया| जो आपने मुसम्मी ${accusedNames} को हालात बतलाकर दरियाफ्त अमल में लाई| जो आपने मुसम्मी ${accusedNames} को U/S 126/170 BNSS में बाद बतलाकर कारण गिरफ्तारी हस्ब जाफ्ता गिरफ्तार किया और गिरफ्तारी के समय माननीय सुप्रीम कोर्ट के तमाम आदेशो का पालन किया व उनकी गिरफतारी की सूचना मुताबिक़ Arrest Memo दी व accused की personal search अमल में लाइ गई जिससे कोई शह बरामद नहीं हुई है, अगर आपने उपरोक्त accused के खिलाफ U/S 126/170 BNSS की कार्यवाही न की होती तो वह ${groupTerm} शक्श उस समय कोई भी cognizable offence कर सकते थे, इसके बाद आपने उपरोक्त ${groupTerm} accused का Burari Hospital, Delhi में Medical Examination कराया जो मुलजिमो को बाद खिलाकर खाना मामूरा संतरी से चेक कराकर बंदी हवालात किया गया। जो उपरोक्त ${groupTerm} Accused को कलंदरा 126/170 BNSS का तैयार करके बजरिये कलन्दरा U/S 126/170 BNSS माननीय SEM OND साहब की कोर्ट में पेश किया जायेगा |

आपने मेरा ब्यान लिखा सुन लिया समझ लिया ठीक है।`;
};

const generateIoStatement = (data) => {
  const { ddNo, date, placeOfIncident, ioName, ioRank, ioBelt, ctName, ctRank, ctBelt, accused } = data;
  const accusedCount = accused.length;
  const groupTerm = accusedCount > 2 ? 'चारों' : 'दोनो';
  const accusedString = getAccusedString(accused);
  const accusedNames = getAccusedNamesOnly(accused);
  const incidentLoc = placeOfIncident || '...........................';

  return `बयान किया की मै थाना Bhalaswa dairy में बतौर ${ioRank} तैनात हूँ | मन ${ioRank} मय हमराही ${ctRank} ${ctName} No. ${ctBelt} हाजिर थाना आया हूँ और अपने हमराह मुस्स्मी ${accusedString} को U/s 126/170 BNSS में गिरफ्तार करके लाया हूँ और हालात गिरफ्तारी इस तौर पर है की मन ${ioRank} की Emergency Duty के दौरान PCR CALL DD NO. ${ddNo} DT ${date} मिलने पर मन ${ioRank} मय हमराही स्टाफ PCR Call मे दिये गये पता ${incidentLoc} पर पहुँचा तो वहां पर ${accusedCount} शक्श जोर जोर से गन्दी गन्दी व भद्दी भद्दी गालिया देने लग रहे थे और एक दुसरे को मरने मारने पर ऊतारू हो रहे थे जिसकी इस हरकत पर लोगो की काफी भीड जमा हो रही थी ओर इलाके की शांति भंग हो रही थी और वहा पर मौजूद भीड़ काफी बुरा मना रही थी |

और वह ${groupTerm} शक्स बोल रहे थे की हमारा कोई कुछ नही बिगाड़ सकता है पुलिस हमारा कुछ नही बिगाड़ सकती और आने जाने वालो को भी गाली गलौच करने लगे जिससे आस पास भीड़ जमा होने लगी। जो मन ${ioRank} ने ${ctRank} ${ctName} No. ${ctBelt} की मदद से उन ${groupTerm} शक्सो को काबू किया जो काफी तैश में थे| जिनका नाम व पता बाद दरियाफ्त ${accusedNames} मालूम चला| जो मन ${ioRank} ने उपरोक्त ${groupTerm} शख्शो को काफी समझाने की कोशिश की जो कह रहे थे कि हम यहां के दादा है और हमारा कोई कुछ नही बिगाड़ सकता है। जो वह अपनी हरकतो से बाज नहीं आ रहे थे|

जो मन ${ioRank} ने तमाम हालात जनाब SHO साहब को बतलाये जिन्होंने ACP साहब से Discuss करके Preventive Action U/S 126/170 BNSS अमल में लाने का आदेश फरमाया| जो मन ${ioRank} ने मुसम्मी ${accusedNames} को हालात बतलाकर दरियाफ्त अमल में लाई| जो मन ${ioRank} ने मुसम्मी ${accusedNames} को U/S 126/170 BNSS में बाद बतलाकर कारण गिरफ्तारी हस्ब जाफ्ता गिरफ्तार किया और गिरफ्तारी के समय माननीय सुप्रीम कोर्ट के तमाम आदेशो का पालन किया व उनकी गिरफतारी की सूचना मुताबिक़ Arrest Memo दी व accused की personal search अमल में लाइ गई जिससे कोई शह बरामद नहीं हुई है, अगर मन ${ioRank} ने उपरोक्त accused के खिलाफ U/S 126/170 BNSS की कार्यवाही न की होती तो वह ${groupTerm} शक्श उस समय कोई भी cognizable offence कर सकते थे, इसके बाद मन ${ioRank} ने उपरोक्त ${groupTerm} accused का Burari Hospital, Delhi में Medical Examination कराया जो मुलजिमो को बाद खिलाकर खाना मामूरा संतरी से चेक कराकर बंदी हवालात किया गया। जो उपरोक्त ${groupTerm} Accused को कलंदरा 126/170 BNSS का तैयार करके बजरिये कलन्दरा U/S 126/170 BNSS माननीय SEM OND साहब की कोर्ट में पेश किया जायेगा | समायत फरमाई जावे। रपट इतलान दर्ज है।`;
};


// --- 4. PDF DOCUMENT COMPONENT ---
const KalandraDocument = ({ data, customText }) => {
  const { ddNo, date, ioName, ioRank, ioBelt, ctName, ctRank, ctBelt, accused } = data;

  return (
    <Document>
      {/* PAGE 1: KALANDRA MAIN BODY */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>IN THE COURT OF SEM/ OUTER NORTH DISTT, DELHI</Text>
        
        <Text style={styles.subHeader}>
          DD No - {ddNo}, Dt- {date}, PS- Bhalaswa dairy Distt- Outer North, Delhi
        </Text>
        
        <Text style={styles.subHeader}>
          S/T – {ioRank} {ioName} No. {ioBelt} PS Bhalswa Dairy Delhi
        </Text>

        <Text style={[styles.subHeader, {marginTop: 5}]}>S/V-</Text>
        {accused.map((acc, i) => (
          <Text key={i} style={{fontSize: 10, marginLeft: 10}}>
            ({i+1}) {acc.name} S/o {acc.fatherName} R/o {acc.address} Age- {acc.age} yrs
          </Text>
        ))}

        <Text style={[styles.header, { marginTop: 15 }]}>कलंदरा U/S – 126/170 BNSS</Text>

        {/* --- DYNAMIC MAIN BODY TEXT --- */}
        <Text style={styles.text}>{customText.mainBody}</Text>

        <Text style={[styles.subHeader, {marginTop: 10}]}>सूची गवाहान: -</Text>
        <Text style={{fontSize: 10}}>1. {ctRank} {ctName} No. {ctBelt} PS Bhalswa Dairy</Text>

        {/* Document Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.bold]}>Sr.No.</Text></View>
            <View style={styles.tableColWide}><Text style={[styles.tableCell, styles.bold]}>Documents</Text></View>
            <View style={styles.tableColSmall}><Text style={[styles.tableCell, styles.bold]}>Pages</Text></View>
          </View>
          {[
            { id: 1, name: "Kalandra", p: "2PP" },
            { id: 2, name: "DD Entry", p: "1PP" },
            { id: 3, name: "Arrest memo", p: "4PP" },
            { id: 4, name: "Personal search memo", p: "4PP" },
            { id: 5, name: "MLC", p: "4PP" },
            { id: 6, name: "Statement", p: "2PP" },
            { id: 7, name: "CONVICTION SLIP", p: "4PP" },
          ].map((row) => (
             <View style={styles.tableRow} key={row.id}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{row.id}</Text></View>
              <View style={styles.tableColWide}><Text style={styles.tableCell}>{row.name}</Text></View>
              <View style={styles.tableColSmall}><Text style={styles.tableCell}>{row.p}</Text></View>
            </View>
          ))}
        </View>

        <View style={styles.signatureSection}>
          <Text style={styles.bold}>{ioRank} {ioName}</Text>
          <Text>No. {ioBelt}</Text>
          <Text>PS- Bhalswa Dairy</Text>
        </View>

        <View style={styles.signatureLeft}>
          <Text>Forwarded please</Text>
          <Text style={styles.bold}>SHO/Bhalswa Dairy</Text>
        </View>
      </Page>

      {/* PAGE 2: STATEMENTS */}
      <Page size="A4" style={styles.page}>
         {/* Constable Statement */}
        <Text style={styles.subHeader}>Statement Of {ctRank} {ctName} No. {ctBelt} PS Bhalaswa Dairy U/S 180 BNSS</Text>
        
        {/* --- DYNAMIC CT STATEMENT --- */}
        <Text style={styles.text}>{customText.ctStatement}</Text>
        
        <View style={styles.signatureSection}>
           <Text style={styles.bold}>{ctRank} {ctName}</Text>
           <Text>No. {ctBelt}</Text>
        </View>

        <View style={styles.divider} />

        {/* IO Statement */}
        <Text style={[styles.subHeader, {marginTop: 20}]}>Statement Of {ioRank} {ioName} No. {ioBelt} PS Bhalaswa Dairy U/S 180 BNSS</Text>
        
        {/* --- DYNAMIC IO STATEMENT --- */}
        <Text style={styles.text}>{customText.ioStatement}</Text>
        
        <View style={styles.signatureSection}>
           <Text style={styles.bold}>{ioRank} {ioName}</Text>
           <Text>No. {ioBelt}</Text>
        </View>
      </Page>
    </Document>
  );
};


// --- 5. APP COMPONENT (UI) ---
const App = () => {
  const [formData, setFormData] = useState({
    ddNo: '',
    date: new Date().toLocaleDateString('en-GB').replace(/\//g, '.'),
    placeOfIncident: '',
    ioName: '',
    ioRank: 'SI',
    ioBelt: '',
    ctName: '',
    ctRank: 'Ct.',
    ctBelt: '',
    accused: [
      { name: '', fatherName: '', address: '', age: '' }
    ]
  });

  // State to hold the large text bodies
  const [textState, setTextState] = useState({
    mainBody: '',
    ctStatement: '',
    ioStatement: '',
  });

  // Track if user has manually edited text to prevent auto-overwrite
  const [isManualEdit, setIsManualEdit] = useState(false);

  // AUTO-UPDATE EFFECT
  useEffect(() => {
    if (!isManualEdit) {
      regenerateText();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const regenerateText = () => {
    setTextState({
      mainBody: generateMainBody(formData),
      ctStatement: generateCtStatement(formData),
      ioStatement: generateIoStatement(formData),
    });
    setIsManualEdit(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextChange = (e) => {
    setIsManualEdit(true); 
    setTextState({ ...textState, [e.target.name]: e.target.value });
  };

  const handleAccusedChange = (index, field, value) => {
    const updatedAccused = [...formData.accused];
    updatedAccused[index][field] = value;
    setFormData({ ...formData, accused: updatedAccused });
  };

  const addAccused = () => {
    setFormData({
      ...formData,
      accused: [...formData.accused, { name: '', fatherName: '', address: '', age: '' }]
    });
  };

  const removeAccused = (index) => {
    const updatedAccused = formData.accused.filter((_, i) => i !== index);
    setFormData({ ...formData, accused: updatedAccused });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Kalandra Generator (Editable)</h1>
          <p className="text-gray-500 text-sm">Fill details, then review/edit the final text before downloading.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT COLUMN: FORM DATA */}
          <div className="space-y-6">
             {/* Section 1: Case Details */}
             <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 bg-gray-100 p-2 rounded">1. Case Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">DD Number</label>
                  <input type="text" name="ddNo" placeholder="e.g. 83A" onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date (DD.MM.YYYY)</label>
                  <input type="text" name="date" value={formData.date} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Place of Incident (Address given in Call)</label>
                  <input 
                    type="text" 
                    name="placeOfIncident" 
                    placeholder="e.g. H.No 123, Gali No 5, Swaroop Nagar" 
                    onChange={handleInputChange} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" 
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Police Staff */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 bg-gray-100 p-2 rounded">2. Police Staff</h3>
              <div className="grid grid-cols-3 gap-2">
                 <div className="col-span-1">
                   <label className="block text-xs font-bold text-gray-500 uppercase">IO Rank</label>
                   <select name="ioRank" onChange={handleInputChange} className="w-full border p-2 rounded">
                     <option>SI</option><option>ASI</option><option>HC</option>
                   </select>
                 </div>
                 <div className="col-span-1">
                   <label className="block text-xs font-bold text-gray-500 uppercase">IO Name</label>
                   <input name="ioName" placeholder="Name" onChange={handleInputChange} className="w-full border p-2 rounded" />
                 </div>
                 <div className="col-span-1">
                   <label className="block text-xs font-bold text-gray-500 uppercase">Belt No</label>
                   <input name="ioBelt" placeholder="D-xxxx" onChange={handleInputChange} className="w-full border p-2 rounded" />
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                 <div className="col-span-1">
                   <label className="block text-xs font-bold text-gray-500 uppercase">Ct Rank</label>
                   <select name="ctRank" onChange={handleInputChange} className="w-full border p-2 rounded">
                     <option>Ct.</option><option>HC</option><option>W/Ct.</option>
                   </select>
                 </div>
                 <div className="col-span-1">
                   <label className="block text-xs font-bold text-gray-500 uppercase">Ct Name</label>
                   <input name="ctName" placeholder="Name" onChange={handleInputChange} className="w-full border p-2 rounded" />
                 </div>
                 <div className="col-span-1">
                   <label className="block text-xs font-bold text-gray-500 uppercase">Belt No</label>
                   <input name="ctBelt" placeholder="123/OND" onChange={handleInputChange} className="w-full border p-2 rounded" />
                 </div>
              </div>
            </div>

             {/* Section 3: Accused */}
             <div className="">
              <div className="flex justify-between items-center mb-4 bg-gray-100 p-2 rounded">
                 <h3 className="font-semibold text-gray-700">3. Accused Details</h3>
                 <button onClick={addAccused} className="flex items-center text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                   <PlusCircle size={16} className="mr-1"/> Add
                 </button>
              </div>
              
              {formData.accused.map((acc, index) => (
                <div key={index} className="flex flex-wrap gap-2 mb-4 p-3 border rounded-lg bg-gray-50 items-end">
                  <div className="w-full flex justify-between">
                    <span className="text-xs font-bold text-gray-500">ACCUSED #{index + 1}</span>
                    {formData.accused.length > 1 && (
                      <button onClick={() => removeAccused(index)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <input placeholder="Name" value={acc.name} onChange={(e) => handleAccusedChange(index, 'name', e.target.value)} className="w-full p-2 border rounded" />
                  <input placeholder="Father's Name" value={acc.fatherName} onChange={(e) => handleAccusedChange(index, 'fatherName', e.target.value)} className="w-[48%] p-2 border rounded" />
                  <input placeholder="Age" value={acc.age} onChange={(e) => handleAccusedChange(index, 'age', e.target.value)} className="w-[48%] p-2 border rounded" />
                  <input placeholder="Full Address" value={acc.address} onChange={(e) => handleAccusedChange(index, 'address', e.target.value)} className="w-full p-2 border rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: TEXT EDITING */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 h-full">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-gray-800 flex items-center gap-2">
                 Draft Content 
                 {isManualEdit ? 
                   <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded border border-amber-200 flex items-center gap-1"><Lock size={12}/> Manual Mode</span> : 
                   <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200 flex items-center gap-1"><Unlock size={12}/> Auto-Syncing</span>
                 }
               </h3>
               {isManualEdit && (
                 <button onClick={regenerateText} className="text-xs flex items-center gap-1 text-blue-600 hover:underline">
                   <RefreshCw size={12}/> Reset to Template
                 </button>
               )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Page 1: Kalandra Body</label>
                <textarea 
                  name="mainBody" 
                  value={textState.mainBody} 
                  onChange={handleTextChange} 
                  rows={10}
                  className="w-full p-3 text-sm border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Page 2: Ct. Statement</label>
                <textarea 
                  name="ctStatement" 
                  value={textState.ctStatement} 
                  onChange={handleTextChange} 
                  rows={6}
                  className="w-full p-3 text-sm border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Page 2: IO Statement</label>
                <textarea 
                  name="ioStatement" 
                  value={textState.ioStatement} 
                  onChange={handleTextChange} 
                  rows={6}
                  className="w-full p-3 text-sm border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-10 border-t pt-6 text-center">
          <PDFDownloadLink document={<KalandraDocument data={formData} customText={textState} />} fileName={`Kalandra_DD${formData.ddNo || 'Draft'}.pdf`}>
            {({ loading }) => (
              <button className={`flex items-center justify-center mx-auto px-6 py-3 rounded-lg text-white font-semibold text-lg ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}>
                <FileDown className="mr-2" />
                {loading ? 'Generating PDF...' : 'Download Kalandra PDF'}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default App;