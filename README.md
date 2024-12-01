# A Chatbot for Diagnosing Skin Diseases Through Text and Image Analysis

This project, **SkinClarify**, is built with **Next.js 14**, **MongoDB**, and **NextAuth v5**. It helps users detect skin diseases through descriptions or by uploading images. For image analysis, we use a pre-trained model, while for text descriptions, we fine-tune the model with our own dataset based on Microsoft’s BiomedNLP-PubMedBERT-base-uncased-abstract.

## Types of Diseases Classified

1. **Acne and Rosacea**
2. **Actinic Keratosis, Basal Cell Carcinoma, and other Malignant Lesions**
3. **Eczema**
4. **Melanoma Skin Cancer, Nevi, and Moles**
5. **Psoriasis, Lichen Planus, and related diseases**
6. **Tinea, Ringworm, Candidiasis, and other Fungal Infections**
7. **Urticaria, Hives**
8. **Nail Fungus and other Nail Diseases**

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js**
- **npm** or **yarn**
- **MongoDB**
- **Flask API Development**

## Installation

Clone the repository:

```bash
git clone https://github.com/MOHITH-2002/Chat-Bot-SkinClarify.git

```
### Installation

1. **Install Dependencies**  
   Run the following command to install the required dependencies:

   ```bash
   npm install
   # or
   yarn install
    ```
2. Set up environment variables:

  Create a .env file in the root directory and add your environment variables:
  ```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=http://localhost:3000

MONGODB_CONNECTION_STRING=
MONGODB_URL=
AUTH_SECRET="don't-try-to-understand-the-code-you-will-not-understand"
EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=
```
### Running the Development Server
   Start the development server:
```bash
npm run dev
# or
yarn dev
```
## For API Development: Machine Learning 
  ### 1. Image Upload for Skin Disease Detection
  Clone this repository:
  ```bash
git clone https://github.com/MOHITH-2002/skin-disease-image-api.git.
```
Then run the command:
 ```bash
pip install -r requirements.txt
```
Make sure to expose port 8080, as the API runs on this port.

### 2. Text Descriptive Model
Download the file from the following Drive link:
```bash 
https://drive.google.com/drive/u/6/folders/1WT2aaKMfH54rodCDsMAH2_x8us_gfavR
```
Provide a brief explanation of why you want access to this model, along with a short description. I will grant you access to download it.
After that, run the command:
```bash
pip install -r requirements.txt
```
Expose port 5000, as this API runs on this port.

