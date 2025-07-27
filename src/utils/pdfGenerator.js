import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePirateLetterPDF = async (name, content, language) => {
  try {
    // Create a new jsPDF instance with A4 page size
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Page dimensions
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Romantic pink paper background color
    pdf.setFillColor(255, 240, 245); // Lavender blush
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Add romantic texture effect with pink hearts
    pdf.setFillColor(255, 182, 193, 0.1); // Light pink hearts
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * pageWidth;
      const y = Math.random() * pageHeight;
      const size = Math.random() * 1.5;
      pdf.circle(x, y, size, 'F');
    }
    
    // Decorative border with pink theme
    pdf.setDrawColor(219, 112, 147); // Pale violet red
    pdf.setLineWidth(2);
    pdf.rect(margin - 5, margin - 5, contentWidth + 10, pageHeight - (margin * 2) + 10);
    
    // Inner decorative border
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(255, 182, 193); // Light pink
    pdf.rect(margin, margin, contentWidth, pageHeight - (margin * 2));
    
    // Title section with pirate theme
    let yPosition = margin + 15;
    
    // Romantic heart emojis
    pdf.setFontSize(24);
    pdf.setTextColor(220, 20, 60); // Crimson
    pdf.text('💕', pageWidth / 2 - 6, yPosition, { align: 'center' });
    
    yPosition += 8;
    
    // Main title
    pdf.setFontSize(20);
    pdf.setFont('times', 'bold');
    pdf.setTextColor(199, 21, 133); // Medium violet red
    pdf.text('LOVE FROM THE DEEP', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 8;
    
    // Subtitle with romantic emojis
    pdf.setFontSize(12);
    pdf.setFont('times', 'italic');
    pdf.setTextColor(219, 112, 147); // Pale violet red
    pdf.text('💖 A Letter Written with Love 💖', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 10;
    
    // Decorative line
    pdf.setDrawColor(255, 105, 180); // Hot pink
    pdf.setLineWidth(1);
    pdf.line(margin + 20, yPosition, pageWidth - margin - 20, yPosition);
    
    yPosition += 15;
    
    // Date and location
    pdf.setFontSize(10);
    pdf.setFont('times', 'italic');
    pdf.setTextColor(139, 69, 139); // Dark magenta
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    pdf.text(`💌 Written on this day: ${currentDate}`, margin, yPosition);
    pdf.text('From the depths of my heart 💗', pageWidth - margin, yPosition, { align: 'right' });
    
    yPosition += 15;
    
    // Recipient
    pdf.setFontSize(14);
    pdf.setFont('times', 'bold');
    pdf.setTextColor(199, 21, 133); // Medium violet red
    pdf.text(`💝 To my dearest ${name}, 💝`, margin, yPosition);
    
    yPosition += 15;
    
    // Letter content
    pdf.setFontSize(11); // Smaller font to fit on one page
    pdf.setFont('times', 'normal');
    pdf.setTextColor(75, 25, 50); // Dark romantic color
    
    // Split content into paragraphs and wrap text - SINGLE PAGE ONLY
    const paragraphs = content.split('\n\n');
    const lineHeight = 6; // Reduced line height for single page
    const maxContentHeight = pageHeight - yPosition - 80; // Reserve space for signature
    let usedHeight = 0;
    
    for (let i = 0; i < paragraphs.length && usedHeight < maxContentHeight; i++) {
      const paragraph = paragraphs[i].trim();
      if (paragraph && usedHeight < maxContentHeight) {
        const lines = pdf.splitTextToSize(paragraph, contentWidth - 10);
        for (let j = 0; j < lines.length && usedHeight < maxContentHeight; j++) {
          if (yPosition < pageHeight - 70) { // Ensure we don't go too far down
            pdf.text(lines[j], margin + 5, yPosition);
            yPosition += lineHeight;
            usedHeight += lineHeight;
          }
        }
        if (usedHeight < maxContentHeight) {
          yPosition += 3; // Reduced space between paragraphs
          usedHeight += 3;
        }
      }
    }
    
    // Signature section
    yPosition += 10;
    
    // Closing
    pdf.setFont('times', 'italic');
    pdf.setFontSize(12);
    pdf.setTextColor(199, 21, 133); // Medium violet red
    pdf.text('💕 With all my love and devotion, 💕', margin + 5, yPosition);
    
    yPosition += 15;
    
    // Signature
    pdf.setFont('times', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(199, 21, 133);
    pdf.text('Your Secret Admirer 💖', margin + 5, yPosition);
    
    yPosition += 8;
    
    // Romantic symbols
    pdf.setFontSize(14);
    pdf.setTextColor(255, 105, 180); // Hot pink
    pdf.text('💗 💌 💕 � 💞', margin + 5, yPosition);
    
    // Heart seal effect (heart with love message)
    const sealX = pageWidth - margin - 20;
    const sealY = yPosition - 10;
    pdf.setFillColor(255, 20, 147); // Deep pink
    pdf.circle(sealX, sealY, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('times', 'bold');
    pdf.text('💖', sealX, sealY + 2, { align: 'center' });
    
    // Footer decorations
    const footerY = pageHeight - 15;
    pdf.setDrawColor(255, 105, 180); // Hot pink
    pdf.setLineWidth(0.5);
    pdf.line(margin, footerY, pageWidth - margin, footerY);
    
    pdf.setFontSize(8);
    pdf.setTextColor(139, 69, 139); // Dark magenta
    pdf.setFont('times', 'italic');
    pdf.text('💝 Written with love on romantic pink paper 💝', pageWidth / 2, footerY + 5, { align: 'center' });
    
    // Language indicator
    pdf.text(`Language: ${getLanguageName(language)}`, pageWidth - margin, footerY + 5, { align: 'right' });
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const fileName = `LoveFromTheDeep_${name}_${timestamp}.pdf`;
    
    // Save the PDF
    pdf.save(fileName);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Helper function to get full language name
const getLanguageName = (languageCode) => {
  const languages = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'yo': 'Yoruba',
    'bn': 'Bengali/Bangla'
  };
  return languages[languageCode] || 'Unknown';
};

// Alternative function using html2canvas for more complex layouts
export const generatePirateLetterPDFFromHTML = async (elementId, name) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }
    
    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      backgroundColor: '#fff0f5' // Romantic pink paper color
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF - SINGLE PAGE ONLY
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate image dimensions to fit page
    const imgWidth = pageWidth - 20; // 10mm margin on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add romantic pink paper background
    pdf.setFillColor(255, 240, 245); // Lavender blush
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Force fit on one page
    const maxImgHeight = pageHeight - 20; // Maximum height for one page
    const finalImgHeight = Math.min(imgHeight, maxImgHeight);
    const finalImgWidth = (finalImgHeight * canvas.width) / canvas.height;
    
    // Center the image if it's smaller than page width
    const xPosition = (pageWidth - finalImgWidth) / 2;
    
    // Add the letter image - SINGLE PAGE ONLY
    pdf.addImage(imgData, 'PNG', xPosition, 10, finalImgWidth, finalImgHeight);
    
    // Generate filename
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const fileName = `LoveFromTheDeep_${name}_${timestamp}.pdf`;
    
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('Error generating PDF from HTML:', error);
    throw error;
  }
};
