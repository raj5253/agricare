import { useParams } from "next/navigation";
export async function GET() {
  const params = useParams();
  try {
    const res = await axios.get(
      `http://127.0.0.1:5000/api/crop_details/${params.cropId}/update`
    );
    return NextResponse.json(res.data);
  } catch (error) {
    // console.log(error);
    return NextResponse.json({
      status: 500,
      msg: "Failed to get data",
    });
  }
}
