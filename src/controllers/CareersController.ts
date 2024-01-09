import express from 'express';
import { CareersModel } from '../Models';
import { ObjectId } from 'mongodb';

require('dotenv').config();

const validSortValues = [
  { label: 'Resume', value: 'resume' },
  { label: 'Cover Letter', value: 'cover' },
  { label: 'Careers', value: 'careers' },
  { label: 'Career Counseling', value: 'career_counseling' },
  { label: 'Job Search Strategy', value: 'job_search_strategy' },
  { label: 'Branding', value: 'branding' },
  { label: 'Social Media Management', value: 'social_media_management' },
  { label: 'Social Media Marketing', value: 'social_media_marketing' },
  { label: 'LinkedIn Optimization', value: 'linkedin_optimization' },
];

function isValidStatus(status: string): boolean {
  const validStatusValues = ['completed', 'pending', 'canceled'];
  return validStatusValues.includes(status);
}

class CareersController {
  async get(req: express.Request, res: express.Response) {
    const maxItemsPerPage = 10;

    const currentPage = req.query.page || undefined;

    if (!currentPage) {
      return res.status(400).json({ error: 'Page parameter is required' });
    }

    const careers = new CareersModel();
    const itemCount = await careers.collection.countDocuments();
    const totalPages = Math.ceil(itemCount / maxItemsPerPage);
    careers.collection
      .find()
      .sort({ _id: -1 })
      .limit(maxItemsPerPage)
      .skip((+currentPage - 1) * maxItemsPerPage)
      .toArray()
      .then((result) => {
        const data = {
          items: result,
          totalPages,
        };
        res.send(data);
      })
      .catch((err) => res.status(400).json(err));
  }

  async getDashboard(req: express.Request, res: express.Response) {
    try {
      const careers = new CareersModel();
      let items;

      careers.collection
        .find()
        .sort({ _id: -1 })
        .limit(3)
        .toArray()
        .then((result) => {
          // const data = {
          //   items: result,
          // };
          items = result;
        })
        .catch((err) => res.status(400).json(err));

      // Count all orders
      const totalOrdersCount = await CareersModel.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      // Count orders with 'new' status
      const newStatusCount = await CareersModel.aggregate([
        {
          $match: { 'general.status': 'new' },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      // Count orders with 'pending' status
      const pendingStatusCount = await CareersModel.aggregate([
        {
          $match: { 'general.status': 'pending' },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      // Extracting counts:
      const totalOrders = totalOrdersCount[0]?.count || 0;
      const newStatus = newStatusCount[0]?.count || 0;
      const pendingStatus = pendingStatusCount[0]?.count || 0;

      // Send the counts to the frontend
      res.json({
        totalOrders,
        newStatus,
        pendingStatus,
        items,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getWithQuery(req: express.Request, res: express.Response) {
    try {
      const typeValue = req.query.type as string | undefined; // Get the sort value from the query parameters
      const searchValue = req.query.search as string | string[] | undefined; // Get the search value from the query parameters

      let query: any = {};

      // Check if sort parameter is provided
      if (typeValue) {
        const matchingSortLabel = validSortValues.find(
          (ValidSortValue) => ValidSortValue.value === typeValue,
        )?.label;

        if (!matchingSortLabel) {
          return res.status(400).json({ error: 'Incorrect sorting value' });
        }

        query['general.product'] = matchingSortLabel;
      }

      // Check if search parameter is provided
      if (searchValue) {
        const regexSearchValue = searchValue instanceof Array ? searchValue.join('|') : searchValue;
        const regex = new RegExp(regexSearchValue, 'i'); // 'i' for case-insensitive

        query.$or = [{ 'general.fullname': regex }, { 'general.email': regex }];
      }

      // Use the CareersModel to find documents based on the query
      const result: Document[] = await CareersModel.find(query);

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    // await CareersModel.find({ 'general.product': matchingSortLabel })
    //   .sort({ 'general.product': 1 })
    //   .then((result) => {
    //     res.status(200).json(result);
    //   })
    //   .catch((error: any) => {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    //   });
  }

  async delete(req: express.Request, res: express.Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Id parameter is required' });
    }

    const careers = new CareersModel();
    const objectId = new ObjectId(id);

    try {
      const result = await careers.collection.deleteOne({ _id: objectId });

      if (result.deletedCount === 1) {
        res.json({ message: 'Order deleted' });
      } else {
        res.status(404).json({ error: 'Order was not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async patchStatus(req: express.Request, res: express.Response) {
    try {
      const { status, id } = req.body;

      console.log(status, id);

      if (!id) {
        return res.status(400).json({ error: 'Id parameter is required' });
      }

      const careers = await CareersModel.findById(id);

      if (!careers) {
        return res.status(404).json({ message: 'Career not found' });
      }

      // Validate status
      if (status && !isValidStatus(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }

      // Update status
      careers.general.status = status;

      // Save the updated document
      await careers.save();

      res.status(200).json({ message: 'Status has been changed' });
    } catch (error) {
      // Log the error for debugging
      console.error(error);

      // Respond with an internal server error
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  submit(req: express.Request, res: express.Response) {
    const userIp = req.ip || req.headers['x-forwarded-for'];

    const userAgent = req.headers['user-agent'];

    const postData = {
      general: {
        fullname: req.body.fullname,
        email: req.body.email,
        product: req.body.product,
        description: req.body?.description,
      },
      securityData: {
        ip: userIp,
        userAgent,
      },
    };

    const careers = new CareersModel(postData);

    careers
      .save()
      .then((obj: any) => {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: 'careers@trimsy.ca', // Change to your recipient
          from: 'support@trimsy.org', // Change to your verified sender
          subject: `${obj.fullname} - New Application. Trimsy Careers`,
          text: `New Application form has been received from Trimsy Careers!:
          Info:
          FullName: ${obj.fullname}
          Email: ${obj.email}
          Type: ${obj.type}
          IP Address: ${obj.ip}
          User Agent: ${obj.userAgent}`,
          html: `<p>New Application form has been received from Trimsy Careers!:</p><br />
          <span>FullName: ${obj.fullname}</span><br />
          <span>Email: ${obj.email}</span><br />
          <span>Type: ${obj.type}</span><br />
          <span>IP Address: ${obj.ip}</span><br />
          <span>User Agent: ${obj.userAgent}</span>`,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent: Careers application');
          })
          .catch((error: any) => {
            console.error(error);
          });

        res.json({ message: 'success' });
      })
      .catch((reason: any) => {
        res.status(400).json(reason);
      });
  }
}

export default CareersController;
