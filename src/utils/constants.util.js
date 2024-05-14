const ROLES = ['STUDENT', 'TEACHER', 'ALUMNI', 'ENTREPRISE', 'ADMIN', 'SUPERADMIN']
const OFFRE_STATE = ['REJECTED', 'ACCEPTED', 'INTERVIEWED', 'WAITING']
const INFORMATION_EXTRACTED = {
  method: 'POST',
  url: 'https://resume-parsing-api2.p.rapidapi.com/processDocument',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '3c45c1b88dmsh1c6323adc92de0ap1ee266jsn8755c4c5f816',
    'X-RapidAPI-Host': 'resume-parsing-api2.p.rapidapi.com'
  },
  data: {
    extractionDetails: {
      name: 'Resume - Extraction',
      language: 'English',
      fields: [
        {
          key: 'personal_info',
          description: 'personal information of the person',
          type: 'object',
          properties: [
            {
              key: 'name',
              description: 'name of the person',
              example: 'Alex Smith',
              type: 'string'
            },
            {
              key: 'email',
              description: 'email of the person',
              example: 'alex.smith@gmail.com',
              type: 'string'
            },
            {
              key: 'phone',
              description: 'phone of the person',
              example: '0712 123 123',
              type: 'string'
            },
            {
              key: 'address',
              description: 'address of the person',
              example: 'Bucharest, Romania',
              type: 'string'
            }
          ]
        },
        {
          key: 'work_experience',
          description: 'work experience of the person',
          type: 'array',
          items: {
            type: 'object',
            properties: [
              {
                key: 'title',
                description: 'title of the job',
                example: 'Software Engineer',
                type: 'string'
              },
              {
                key: 'start_date',
                description: 'start date of the job',
                example: '2022',
                type: 'string'
              },
              {
                key: 'end_date',
                description: 'end date of the job',
                example: '2023',
                type: 'string'
              },
              {
                key: 'company',
                description: 'company of the job',
                example: 'Fastapp Development',
                type: 'string'
              },
              {
                key: 'location',
                description: 'location of the job',
                example: 'Bucharest, Romania',
                type: 'string'
              },
              {
                key: 'description',
                description: 'description of the job',
                example: 'Designing and implementing server-side logic to ensure high performance and responsiveness of applications.',
                type: 'string'
              }
            ]
          }
        },
        {
          key: 'education',
          description: 'school education of the person',
          type: 'array',
          items: {
            type: 'object',
            properties: [
              {
                key: 'title',
                description: 'title of the education',
                example: 'Master of Science in Computer Science',
                type: 'string'
              },
              {
                key: 'start_date',
                description: 'start date of the education',
                example: '2022',
                type: 'string'
              },
              {
                key: 'end_date',
                description: 'end date of the education',
                example: '2023',
                type: 'string'
              },
              {
                key: 'institute',
                description: 'institute of the education',
                example: 'Bucharest Academy of Economic Studies',
                type: 'string'
              },
              {
                key: 'location',
                description: 'location of the education',
                example: 'Bucharest, Romania',
                type: 'string'
              },
              {
                key: 'description',
                description: 'description of the education',
                example: 'Advanced academic degree focusing on developing a deep understanding of theoretical foundations and practical applications of computer technology.',
                type: 'string'
              }
            ]
          }
        },
        {
          key: 'languages',
          description: 'languages spoken by the person',
          type: 'array',
          items: {
            type: 'string',
            example: 'English'
          }
        },
        {
          key: 'skills',
          description: 'skills of the person',
          type: 'array',
          items: {
            type: 'string',
            example: 'NodeJS'
          }
        },
        {
          key: 'certificates',
          description: 'certificates of the person',
          type: 'array',
          items: {
            type: 'string',
            example: 'AWS Certified Developer - Associate'
          }
        }
      ]
    },
    file: ''
  }
}
const NOTIFICATION_TYPES = ['NEW_OFFER']
module.exports = {
  ROLES,
  OFFRE_STATE,
  INFORMATION_EXTRACTED,
  NOTIFICATION_TYPES
}
