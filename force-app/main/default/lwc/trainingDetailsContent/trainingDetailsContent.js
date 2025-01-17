import { LightningElement } from 'lwc';

export default class TrainingDetails extends LightningElement {
    selectedTraining = null;
    overviewModules = [];

    handleButtonClick(event) {
        const trainingType = event.target.name;

        if (trainingType === 'salesforce') {
            this.selectedTraining = {
                title: 'Salesforce Advanced Training Program',
                trainingdetails: [
                    'Comprehensive 60 hours live training with mini-projects every Topics.',
                    '20 hours of real-world live projects guided by expert mentors.',
                    '20 hours of certification preparation including mock tests.',
                    '10 hours of intensive interview preparation with mock interviews.'
                ],
                adminTopics: [
                    'Advanced Roles, Profiles, and Permissions',
                    'Custom Permission Sets',
                    'Salesforce Shield Encryption',
                    'Audit Trail and Event Monitoring'
                ],
                devTopics: [
                    'Apex Trigger Frameworks and Bulkification',
                    'Advanced Trigger Framework',
                    'Mastering Lightning Web Components (LWC)',
                    'Integration with REST APIs and Platform Events'
                ]
            };

            // Define the overview modules with additional descriptions
            this.overviewModules = [
                {
                    title: 'Roles and Profiles',
                    description: 'Master roles, profiles, permissions, and sharing models. Understand how to configure access and visibility for various user roles and profiles across the organization.',
                    icon: 'utility:lock',
                    link: 'https://trailhead.salesforce.com/content/learn/modules/admin-essentials-for-public-sector-solutions/set-up-users-application-categories-regulatory-authorities-and-more'
                },
                {
                    title: 'Identity Management',
                    description: 'Advanced identity management and SSO configurations. Implement Single Sign-On (SSO) to streamline user authentication and improve security within your Salesforce environment.',
                    icon: 'utility:identity',
                    link: 'https://www.miniorange.com/iam/integrations/salesforce-single-sign-on-sso'
                },
                {
                    title: 'Automation Solutions',
                    description: 'Design scalable and secure automation solutions using Flows. Automate business processes efficiently and without writing code by utilizing Salesforce Flow Builder.',
                    icon: 'utility:flow'
                },
                {
                    title: 'Platform Encryption',
                    description: 'Implement platform encryption and audit tools for real-world scenarios. Protect sensitive data and maintain compliance by using Salesforce encryption and monitoring tools.',
                    icon: 'utility:shield'
                },
                {
                    title: 'Data Management',
                    description: 'Learn data import/export, deduplication, and cleaning strategies. Develop strategies to manage large datasets, ensuring that data remains accurate and accessible.',
                    icon: 'utility:database'
                },
                {
                    title: 'Einstein Analytics',
                    description: 'Explore advanced reporting, Tableau CRM, and predictive analytics. Use Einstein Analytics to build powerful visualizations and predictive models for informed business decisions.',
                    icon: 'utility:table'
                },
                {
                    title: 'Integration Mastery',
                    description: 'Hands-on experience with REST APIs, SOAP APIs, and external integrations. Learn how to connect Salesforce with external systems and retrieve or send data between platforms.',
                    icon: 'utility:integration'
                },
                {
                    title: 'Advanced Apex Programming',
                    description: 'Master Apex triggers, batch processing, and error handling. Learn advanced techniques to optimize Apex code and create highly efficient, scalable solutions.',
                    icon: 'utility:custom_apps'
                },
                {
                    title: 'Lightning Experience',
                    description: 'Build dynamic user interfaces with Lightning Web Components (LWC). Develop modern UIs that are responsive and accessible, enhancing the user experience.',
                    icon: 'utility:thunder'
                },
                {
                    title: 'DevOps with Salesforce',
                    description: 'Automate deployments using CI/CD tools like Copado and Git. Implement continuous integration and delivery pipelines to streamline the development and deployment process.',
                    icon: 'utility:setup'
                },
                {
                    title: 'Security Best Practices',
                    description: 'Implement security controls and prevent vulnerabilities. Learn best practices for securing Salesforce data, users, and applications to meet compliance standards.',
                    icon: 'utility:lock'
                },
                {
                    title: 'Event Monitoring',
                    description: 'Track user activity and detect anomalies using Event Monitoring. Gain insights into user actions and identify potential security risks by leveraging event data.',
                    icon: 'utility:activity'
                },
                {
                    title: 'Process Automation',
                    description: 'Design efficient processes using advanced Flow Builder techniques. Create robust and dynamic processes that automate business workflows without complex code.',
                    icon: 'utility:record_create'
                },
                {
                    title: 'Mobile App Development',
                    description: 'Create mobile-optimized pages and components using Salesforce Mobile SDK. Build custom mobile experiences that extend Salesforce to mobile devices.',
                    icon: 'utility:tablet_landscape'
                },
                {
                    title: 'Dynamic Forms and Actions',
                    description: 'Utilize dynamic forms and actions for flexible page layouts. Enable user-friendly, personalized experiences by creating responsive pages and actions in Salesforce.',
                    icon: 'utility:form'
                }
            ];
        } else {
            this.selectedTraining = null;
            this.overviewModules = [];
        }
    }
    
}