# AI Blog Generator

An AI-powered blog generation application that uses AWS Bedrock (Google Gemma 3 model) to generate blog posts. The backend runs as an AWS Lambda function triggered via API Gateway, with generated blogs stored in S3.

## Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │ ───► │ API Gateway │ ───► │    Lambda   │ ───► │   Bedrock   │
│   (React)   │      │             │      │  (Python)   │      │   (Gemma)   │
└─────────────┘      └─────────────┘      └─────────────┘      └─────────────┘
                                                              │
                                                              ▼
                                                    ┌─────────────────┐
                                                    │       S3        │
                                                    │  (Blog Storage) │
                                                    └─────────────────┘
```

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

### Backend
- **Python** (AWS Lambda)
- **AWS Bedrock** - AI model (Google Gemma 3 27B)
- **AWS API Gateway** - HTTP trigger
- **AWS S3** - Blog storage

## Project Structure

```
aws_blog_generate/
├── app.py                 # Lambda function code
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and API
│   │   └── App.tsx        # Main app component
│   ├── public/            # Static assets
│   ├── index.html         # HTML entry point
│   ├── package.json       # Frontend dependencies
│   ├── tailwind.config.ts # Tailwind configuration
│   └── vite.config.ts     # Vite configuration
└── README.md              # This file
```

## Setup

### Prerequisites
- Node.js 18+
- Python 3.9+
- AWS Account with Bedrock access
- AWS CLI configured

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

### Backend Setup (AWS)

1. **Create Lambda Function**
   - Go to AWS Lambda console
   - Create a new function (Python 3.9+)
   - Copy the code from `app.py`
   - Add layer for boto3 (or use default)

2. **Configure AWS Bedrock**
   - Go to AWS Bedrock console
   - Enable access to "Google Gemma 3 27B IT" model
   - Note: Ensure your region supports the model

3. **Create API Gateway**
   - Go to API Gateway console
   - Create REST API
   - Create POST method connected to your Lambda
   - Enable CORS for your frontend domain
   - Deploy API and note the endpoint URL

4. **Create S3 Bucket**
   - Go to S3 console
   - Create a bucket (e.g., `aws-bedrock-course1`)
   - Note the bucket name in the Lambda code if different

5. **Update Frontend API**
   - Edit `frontend/src/lib/api.ts`
   - Update the API endpoint URL to your API Gateway URL

## Environment Variables

The Lambda function uses these values (update in code as needed):
- `region_name`: AWS region (default: us-east-1)
- `modelId`: Bedrock model (default: google.gemma-3-27b-it)
- `s3_bucket`: S3 bucket name (default: aws_bedrock_course1)

## API Request Format

**Endpoint:** `POST <your-api-gateway-url>`

**Request Body:**
```json
{
  "blog_topic": "Your blog topic here"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "body": "Generated blog content..."
}
```

## Usage

1. Start the frontend development server
2. Enter a blog topic in the input field
3. Click "Generate" to create a blog
4. The generated blog will be displayed and saved to S3

## Example Topics
- Machine Learning
- Web Development
- Climate Change
- Space Exploration
- Healthy Eating

## Security Notes

- Update the CORS settings in API Gateway to restrict allowed origins
- Consider adding authentication to your API Gateway
- Use IAM roles with least privilege for Lambda execution
- Store sensitive configuration in AWS Secrets Manager

## License

MIT
